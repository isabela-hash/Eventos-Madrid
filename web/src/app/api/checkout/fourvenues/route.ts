import { NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/airtable";
import { createFourvenuesCheckout } from "@/lib/providers/fourvenues";

interface CheckoutBody {
  event_slug?: string;
  offer_id?: string;
  quantity?: number;
  full_name?: string;
  email?: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CheckoutBody;
  const quantity = Math.max(1, Math.min(Number(body.quantity ?? 1), 10));

  if (!body.event_slug || !body.offer_id || !body.full_name || !body.email) {
    return NextResponse.json({ error: "event_slug, offer_id, full_name, and email are required." }, { status: 400 });
  }

  const event = await getEventBySlug(body.event_slug);
  const offer = event?.ticket_offers?.find((item) => item.id === body.offer_id);

  if (!event || !offer) return NextResponse.json({ error: "Event or ticket offer not found." }, { status: 404 });
  if (event.provider !== "fourvenues" || offer.provider !== "fourvenues") {
    return NextResponse.json({ error: "This checkout endpoint only supports Fourvenues offers." }, { status: 400 });
  }
  if (!offer.available || offer.status !== "active") {
    return NextResponse.json({ error: "This ticket offer is not available." }, { status: 409 });
  }
  if (quantity < offer.min_quantity || quantity > offer.max_quantity) {
    return NextResponse.json({ error: `Quantity must be between ${offer.min_quantity} and ${offer.max_quantity}.` }, { status: 400 });
  }

  try {
    const checkout = await createFourvenuesCheckout({
      event,
      offer,
      quantity,
      buyer: {
        full_name: body.full_name,
        email: body.email,
      },
    });

    return NextResponse.json({
      payment_url: checkout.data?.payment_url,
      payment_id: checkout.data?.payment_id,
      conditions_changed: Boolean(checkout.data?.conditions_changed),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create Fourvenues checkout." },
      { status: 502 }
    );
  }
}
