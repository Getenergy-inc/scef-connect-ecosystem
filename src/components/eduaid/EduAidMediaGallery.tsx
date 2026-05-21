import studentClassroom from "@/assets/eduaid-gallery/eduaid-student-classroom.jpg";

const videos = [
  { src: "/media/eduaid/eduaid-impact-1.mp4", caption: "EduAid-Africa learners in the classroom" },
  { src: "/media/eduaid/eduaid-impact-2.mp4", caption: "EduAid-Africa field engagement" },
];

export const EduAidMediaGallery = () => {
  return (
    <section
      aria-labelledby="eduaid-gallery-heading"
      className="bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            From the Field
          </p>
          <h2
            id="eduaid-gallery-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl"
          >
            EduAid-Africa Moments
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Students, classrooms and field stories from the schools and
            communities EduAid-Africa supports.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
          <figure className="relative overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border md:row-span-2">
            <img
              src={studentClassroom}
              alt="EduAid-Africa secondary school student in uniform during class"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-scef-blue-darker/80 to-transparent p-4">
              <figcaption className="text-sm font-medium text-white">
                Learners in EduAid-Africa supported schools
              </figcaption>
            </div>
          </figure>

          {videos.map((v) => (
            <figure
              key={v.src}
              className="relative overflow-hidden rounded-2xl bg-black shadow-sm ring-1 ring-border"
            >
              <video
                src={v.src}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="aspect-video h-full w-full object-cover"
              />
              <figcaption className="sr-only">{v.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EduAidMediaGallery;
