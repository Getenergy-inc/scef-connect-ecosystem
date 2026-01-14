// AI-generated flyer images for the Digital Board
import aboutScefFlyer from '@/assets/digital-board/about-scef-flyer.jpg';
import programsHubFlyer from '@/assets/digital-board/programs-hub-flyer.jpg';
import nesaAfricaFlyer from '@/assets/digital-board/nesa-africa-flyer.jpg';
import eduaidAfricaFlyer from '@/assets/digital-board/eduaid-africa-flyer.jpg';
import rebuildSchoolFlyer from '@/assets/digital-board/rebuild-school-flyer.jpg';
import womenGirlsEducationFlyer from '@/assets/digital-board/women-girls-education-flyer.jpg';
import specialNeedsFlyer from '@/assets/digital-board/special-needs-flyer.jpg';
import educationOnlineFlyer from '@/assets/digital-board/education-online-flyer.jpg';
import elibraryNigeriaFlyer from '@/assets/digital-board/elibrary-nigeria-flyer.jpg';
import joinChapterFlyer from '@/assets/digital-board/join-chapter-flyer.jpg';
import getInvolvedFlyer from '@/assets/digital-board/get-involved-flyer.jpg';
import mediaHubFlyer from '@/assets/digital-board/media-hub-flyer.jpg';
import nesaTvFlyer from '@/assets/digital-board/nesa-tv-flyer.jpg';
import nesaAwardsTvFlyer from '@/assets/digital-board/nesa-awards-tv-flyer.jpg';
import platinumRecognitionFlyer from '@/assets/digital-board/platinum-recognition-flyer.jpg';
import africaIconFlyer from '@/assets/digital-board/africa-icon-flyer.jpg';
import goldCertificateFlyer from '@/assets/digital-board/gold-certificate-flyer.jpg';
import blueGarnetGalaFlyer from '@/assets/digital-board/blue-garnet-gala-flyer.jpg';
import radioFlyer from '@/assets/digital-board/radio-flyer.jpg';
import eduaidWebinarsFlyer from '@/assets/digital-board/eduaid-webinars-flyer.jpg';
import educationTourismFlyer from '@/assets/digital-board/education-tourism-flyer.jpg';

// Map database thumbnail paths to actual imported images
export const thumbnailMap: Record<string, string> = {
  '/src/assets/digital-board/about-scef-flyer.jpg': aboutScefFlyer,
  '/src/assets/digital-board/programs-hub-flyer.jpg': programsHubFlyer,
  '/src/assets/digital-board/nesa-africa-flyer.jpg': nesaAfricaFlyer,
  '/src/assets/digital-board/eduaid-africa-flyer.jpg': eduaidAfricaFlyer,
  '/src/assets/digital-board/rebuild-school-flyer.jpg': rebuildSchoolFlyer,
  '/src/assets/digital-board/women-girls-education-flyer.jpg': womenGirlsEducationFlyer,
  '/src/assets/digital-board/special-needs-flyer.jpg': specialNeedsFlyer,
  '/src/assets/digital-board/education-online-flyer.jpg': educationOnlineFlyer,
  '/src/assets/digital-board/elibrary-nigeria-flyer.jpg': elibraryNigeriaFlyer,
  '/src/assets/digital-board/join-chapter-flyer.jpg': joinChapterFlyer,
  '/src/assets/digital-board/get-involved-flyer.jpg': getInvolvedFlyer,
  '/src/assets/digital-board/media-hub-flyer.jpg': mediaHubFlyer,
  '/src/assets/digital-board/nesa-tv-flyer.jpg': nesaTvFlyer,
  '/src/assets/digital-board/nesa-awards-tv-flyer.jpg': nesaAwardsTvFlyer,
  '/src/assets/digital-board/platinum-recognition-flyer.jpg': platinumRecognitionFlyer,
  '/src/assets/digital-board/africa-icon-flyer.jpg': africaIconFlyer,
  '/src/assets/digital-board/gold-certificate-flyer.jpg': goldCertificateFlyer,
  '/src/assets/digital-board/blue-garnet-gala-flyer.jpg': blueGarnetGalaFlyer,
  '/src/assets/digital-board/radio-flyer.jpg': radioFlyer,
  '/src/assets/digital-board/eduaid-webinars-flyer.jpg': eduaidWebinarsFlyer,
  '/src/assets/digital-board/education-tourism-flyer.jpg': educationTourismFlyer,
};

// Get resolved thumbnail URL (handles both database paths and external URLs)
export const resolveThumbnail = (thumbnailUrl: string | null, fallbackUrl?: string): string => {
  if (!thumbnailUrl) {
    return fallbackUrl || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800';
  }
  
  // Check if it's a local path that needs to be resolved
  if (thumbnailUrl.startsWith('/src/assets/')) {
    return thumbnailMap[thumbnailUrl] || fallbackUrl || thumbnailUrl;
  }
  
  // Return as-is for external URLs
  return thumbnailUrl;
};

// Default fallback images by content type
export const defaultThumbnails: Record<string, string> = {
  video: nesaTvFlyer,
  audio: radioFlyer,
  image: programsHubFlyer,
  text: aboutScefFlyer,
  announcement: aboutScefFlyer,
  flyer: programsHubFlyer,
};

export const getDefaultThumbnail = (contentType: string): string => {
  return defaultThumbnails[contentType] || aboutScefFlyer;
};
