import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "CONFIRMED",
            stripePaymentId: session.id,
          },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
