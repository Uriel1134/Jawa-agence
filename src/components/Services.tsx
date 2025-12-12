import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching services:", error);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="section-padding-lg bg-white/50 dark:bg-jawaBlack/50 backdrop-blur-sm transition-colors duration-300">
      <div className="container-wide">
        <SectionHeader
          number="01."
          title="Services"
          description="Nous combinons stratégie, design et technologie pour créer des produits digitaux qui marquent les esprits et accélèrent votre croissance."
          align="right"
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Link
                to={`/service/${service.id}`}
                key={service.id}
                className="group relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-white/5 dark:border dark:border-white/10 p-8 transition-all duration-500 hover:bg-jawaBlack hover:text-white dark:hover:bg-primary/20 dark:hover:border-primary/50 md:p-10 block animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-3xl font-bold text-gray-200 dark:text-white/10 transition-colors duration-500 group-hover:text-primary">
                        0{index + 1}
                      </span>
                      <div className="h-px w-12 bg-gray-200 dark:bg-white/10 transition-colors duration-500 group-hover:bg-primary/50" />
                    </div>

                    <div>
                      <h3 className="mb-3 font-display text-2xl font-bold leading-tight md:text-3xl text-jawaBlack dark:text-white group-hover:text-white">
                        {service.title}
                      </h3>
                      <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-white/60 transition-colors duration-500 group-hover:text-white/70">
                        {service.description}
                      </p>
                    </div>

                    <div className="group/btn mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-jawaBlack transition-all duration-300 hover:bg-jawaBlack hover:text-white hover:border-jawaBlack group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-white group-hover:backdrop-blur-sm dark:bg-white/10 dark:text-white dark:border-white/10">
                      En savoir plus
                      <svg className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="relative w-full md:w-1/3 aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 dark:bg-white/5">
                    {service.image && (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:opacity-0"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
