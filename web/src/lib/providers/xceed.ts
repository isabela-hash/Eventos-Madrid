import type { Event, TicketOffer } from "@/types";

export function getXceedCheckoutUrl(event: Event, offer?: TicketOffer): string | undefined {
  return offer?.checkout_url ?? event.checkout_url ?? event.ticket_url;
}

export function isXceedConfigured(): boolean {
  return Boolean(process.env.XCEED_API_KEY || process.env.XCEED_WIDGET_KEY);
}
