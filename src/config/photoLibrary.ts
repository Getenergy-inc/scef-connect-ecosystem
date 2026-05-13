import schoolWalk from "@/assets/photos/scef-school-walk.jpg";
import classroomTeacher from "@/assets/photos/scef-classroom-teacher.jpg";
import volunteersOutreach from "@/assets/photos/scef-volunteers-outreach.jpg";
import girlsStem from "@/assets/photos/scef-girls-stem.jpg";
import awardsGala from "@/assets/photos/scef-awards-gala.jpg";
import landscapeAerial from "@/assets/photos/scef-landscape-aerial.jpg";
import advocacyWalk from "@/assets/photos/scef-advocacy-walk.jpg";
import schoolRebuild from "@/assets/photos/scef-school-rebuild.jpg";

/**
 * SCEF authentic photo library.
 * Replace any file in `src/assets/photos/` in-place with a real archive photo
 * to swap it across the entire site without code changes.
 */
export type PhotoCategory =
  | "school-outreach"
  | "classroom"
  | "volunteers"
  | "girls-education"
  | "awards"
  | "landscape"
  | "advocacy"
  | "rebuild";

export interface SCEFPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  year: string;
  category: PhotoCategory;
}

export const photoLibrary: SCEFPhoto[] = [
  {
    id: "school-walk",
    src: schoolWalk,
    alt: "African schoolchildren in green uniforms walking to school carrying books at golden hour",
    caption: "School outreach — learners on their way to class",
    year: "2024",
    category: "school-outreach",
  },
  {
    id: "classroom-teacher",
    src: classroomTeacher,
    alt: "African teacher in patterned dress engaging attentive students in a sunlit classroom",
    caption: "Teacher development — the heart of every SCEF program",
    year: "2023",
    category: "classroom",
  },
  {
    id: "volunteers-outreach",
    src: volunteersOutreach,
    alt: "SCEF youth volunteers in branded shirts collaborating during a school outreach activity",
    caption: "Volunteers powering community education outreach",
    year: "2022",
    category: "volunteers",
  },
  {
    id: "girls-stem",
    src: girlsStem,
    alt: "African girls and young women working with laptops and tablets in a STEM classroom",
    caption: "Girls in STEM — EduAid-Africa digital learning lab",
    year: "2024",
    category: "girls-education",
  },
  {
    id: "awards-gala",
    src: awardsGala,
    alt: "African educators and dignitaries on stage receiving recognition at an education awards ceremony",
    caption: "NESA-Africa — recognising educators across the continent",
    year: "2023",
    category: "awards",
  },
  {
    id: "landscape-aerial",
    src: landscapeAerial,
    alt: "Aerial view of an African community with school buildings, green trees and mountains in golden light",
    caption: "Pan-African landscapes — schools at the heart of community",
    year: "2024",
    category: "landscape",
  },
  {
    id: "advocacy-walk",
    src: advocacyWalk,
    alt: "African community advocacy walk for education with diverse marchers carrying banners",
    caption: "Advocacy walks — communities standing for education",
    year: "2023",
    category: "advocacy",
  },
  {
    id: "school-rebuild",
    src: schoolRebuild,
    alt: "Volunteers and community members rebuilding and painting an African school classroom",
    caption: "Rebuild My School Africa — before, during and after",
    year: "2022",
    category: "rebuild",
  },
];

export const photosByCategory = (cat: PhotoCategory) =>
  photoLibrary.filter((p) => p.category === cat);

export const photoById = (id: string) => photoLibrary.find((p) => p.id === id);
