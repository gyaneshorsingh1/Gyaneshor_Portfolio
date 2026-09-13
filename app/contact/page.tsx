import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";
import { PageFrame } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Contact | Gyaneshor Singh",
  description:
    "Get in touch with Gyaneshor Singh to collaborate on backend systems and digital products.",
};

export default function ContactPage() {
  return (
    <main>
      <PageFrame>
        <Contact />
      </PageFrame>
    </main>
  );
}
