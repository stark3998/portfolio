"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface Certification {
  title: string;
  image: string;
  url: string;
  level: "Expert" | "Associate" | "Specialty" | "Fundamentals";
}

const certifications: Certification[] = [
  {
    title: "Azure Solutions Architect Expert",
    image:
      "https://images.credly.com/size/220x220/images/987adb7e-49be-4e24-b67e-55986bd3fe66/azure-solutions-architect-expert-600x600.png",
    url: "https://www.credly.com/badges/92c88312-dc65-42d5-9a4f-6825ec0011f5/public_url",
    level: "Expert",
  },
  {
    title: "DevOps Engineer Expert",
    image:
      "https://images.credly.com/size/220x220/images/c3ab66f8-5d59-4afa-a6c2-0ba30a1989ca/CERT-Expert-DevOps-Engineer-600x600.png",
    url: "https://www.credly.com/badges/7dd94eb7-6b29-4a57-a97f-049bd5b6c4bb/public_url",
    level: "Expert",
  },
  {
    title: "Azure Security Engineer Associate",
    image:
      "https://images.credly.com/size/220x220/images/1ad16b6f-2c71-4a2e-ae74-ec69c4766039/azure-security-engineer-associate600x600.png",
    url: "https://www.credly.com/badges/26cd122f-3967-425b-a4aa-ec60b527ef5a/public_url",
    level: "Associate",
  },
  {
    title: "Azure Developer Associate",
    image:
      "https://images.credly.com/size/220x220/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png",
    url: "https://www.credly.com/badges/32cd499a-fc06-477f-936b-c8244776afee/public_url",
    level: "Associate",
  },
  {
    title: "Azure Data Engineer Associate",
    image:
      "https://images.credly.com/size/220x220/images/61542181-0e8d-496c-a17c-3d4bf590eda1/azure-data-engineer-associate-600x600.png",
    url: "https://www.credly.com/badges/d304ae45-901a-4aa9-ab1d-7a893abb626c/public_url",
    level: "Associate",
  },
  {
    title: "Azure Network Engineer Associate",
    image:
      "https://images.credly.com/size/220x220/images/c3a2e51d-7984-48cc-a4cb-88d4e8487037/azure-network-engineer-associate-600x600.png",
    url: "https://www.credly.com/badges/bb271826-a1c5-4346-8e54-2cfeb50122f3/public_url",
    level: "Associate",
  },
  {
    title: "Azure Database Administrator Associate",
    image:
      "https://images.credly.com/size/220x220/images/edc0b0d8-55ec-4dfe-9353-22c1bc4e07e8/azure-database-administrator-associate-600x600.png",
    url: "https://www.credly.com/badges/a733ddd5-7695-44fb-8b72-475bd6e36c29/public_url",
    level: "Associate",
  },
  {
    title: "Azure IoT Developer Specialty",
    image:
      "https://images.credly.com/size/220x220/images/2711b780-c3f1-4678-a9ae-f6c49c379189/specialty-azure-iot-developer-600x600.png",
    url: "https://www.credly.com/badges/075f68ba-fbba-4955-9c12-5b87ad79f28a/public_url",
    level: "Specialty",
  },
  {
    title: "Azure AI Fundamentals",
    image:
      "https://images.credly.com/size/220x220/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png",
    url: "https://www.credly.com/badges/c6f59eaa-1176-48ec-b63a-e055c637c594/public_url",
    level: "Fundamentals",
  },
  {
    title: "Azure Data Fundamentals",
    image:
      "https://images.credly.com/size/220x220/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/azure-data-fundamentals-600x600.png",
    url: "https://www.credly.com/badges/bb44ff32-d777-46d3-b465-9c07fa3147ff/public_url",
    level: "Fundamentals",
  },
  {
    title: "Azure Fundamentals",
    image:
      "https://images.credly.com/size/220x220/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    url: "https://www.credly.com/badges/a08f1a61-3623-4c4f-b81f-af0e3d399525/public_url",
    level: "Fundamentals",
  },
];

const levelColors: Record<string, string> = {
  Expert: "bg-amber text-white",
  Associate: "bg-azure text-white",
  Specialty: "bg-teal text-white",
  Fundamentals: "bg-slate-200 text-slate-dark",
};

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Certifications
      </h2>
      <p className="mt-4 text-slate-mid">
        11× Microsoft Certified across architecture, security, development, and data.
      </p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {certifications.map((cert, index) => (
          <motion.a
            key={cert.title}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="glass-card p-4 flex flex-col items-center text-center group"
          >
            <img
              src={cert.image}
              alt={cert.title}
              width={72}
              height={72}
              className="mb-3 group-hover:scale-105 transition-transform"
            />
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium mb-1.5 ${
                levelColors[cert.level]
              }`}
            >
              {cert.level}
            </span>
            <p className="text-[11px] text-slate-mid leading-tight font-medium">
              {cert.title}
            </p>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
