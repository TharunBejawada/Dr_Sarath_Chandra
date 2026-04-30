import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - Dr Sarat Chandra",
  description: "You're welcome! If you need anything else, feel free to ask. Have a great day!",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}