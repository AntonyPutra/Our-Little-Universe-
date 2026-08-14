import { Timeline } from "@/components/story/Timeline";

export function ClientStory({ events }: { events: any[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Our Story</h1>
        <p className="text-purple-200/70 text-lg md:text-xl font-serif italic">
          Every little moment brought us here.
        </p>
      </div>

      <Timeline events={events} />
    </div>
  );
}
