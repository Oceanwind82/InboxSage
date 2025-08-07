import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center">
      {/* Using SVG version until PNG is available */}
      <Image
        src="/images/inboxsage-logo.svg"
        alt="InboxSage Logo"
        width={200}
        height={60}
        priority
      />
    </div>
  );
}
