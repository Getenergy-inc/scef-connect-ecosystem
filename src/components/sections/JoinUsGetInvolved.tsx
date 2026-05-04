import { Link } from "react-router-dom";
import {
  Users,
  Heart,
  Handshake,
  Building2,
  MapPin,
  School,
  GraduationCap,
  Calendar,
  ArrowRight,
} from "lucide-react";

const options = [
  { icon: Users, title: "Become a Volunteer", href: "/get-involved/volunteer" },
  { icon: Heart, title: "Become a Donor", href: "/donate" },
  { icon: Handshake, title: "Become a Sponsor", href: "/partner-with-us?type=sponsor" },
  { icon: Building2, title: "Become a CSR Partner", href: "/partner-with-us?type=csr" },
  { icon: MapPin, title: "Join a Local Chapter", href: "/chapters/join-online" },
  { icon: School, title: "Adopt a School", href: "/programs/rebuild-my-school-africa" },
  { icon: GraduationCap, title: "Sponsor Training & Webinars", href: "/programs/eduaid-africa" },
];

export const JoinUsGetInvolved = () => {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-3">
            Join Us / Get Involved
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Join Us to Empower and Educate 1 Million Africans
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Be part of a Pan-African movement using EduAid-Africa services,
            training, and advocacy to transform education across Africa.
          </p>
        </div>

        {/* Engagement options grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {options.map(({ icon: Icon, title, href }) => (
            <Link
              key={title}
              to={href}
              className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] group-hover:bg-[#0B5D3B] group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="flex flex-1 items-center justify-between gap-2">
                <span className="text-sm font-semibold leading-tight text-[#0A0A0A]">
                  {title}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition-all group-hover:translate-x-0.5 group-hover:text-[#D4AF37]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Monthly engagement model */}
        <div className="mt-10 rounded-2xl border border-[#0B5D3B]/15 bg-gradient-to-br from-[#0B5D3B]/5 to-[#D4AF37]/5 p-6 md:p-8">
          <div className="flex items-start gap-4 md:gap-6 flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B5D3B] text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#0A0A0A] mb-1">
                  Monthly Engagement Model
                </h3>
                <p className="text-sm md:text-base text-neutral-700 max-w-2xl leading-relaxed">
                  Participate monthly as a volunteer, donor, partner, or sponsor by
                  supporting our advocacy calendar, training programs, and
                  education initiatives.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 shrink-0">
              <Link
                to="/programs/eduaid-africa#advocacy-calendars"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B5D3B] hover:bg-[#0E7549] text-white text-sm font-semibold transition-colors"
              >
                View Advocacy Calendar
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/donate?campaign=monthly"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C24A] text-[#0A0A0A] text-sm font-semibold transition-colors"
              >
                Support Monthly Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsGetInvolved;
