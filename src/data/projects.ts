// Project content. Category is a free-form label — a future non-CAD project
// (software, research, writing, etc.) just needs a new categoryLabel, no
// component changes required.
//
// "parts" = physical/assembly components (drives the "N PARTS" chip and the
// parts-gallery section — only shows when parts.length > 1).
// "images" = supplementary visuals (renders, plots, drawings) that do NOT
// count toward the parts chip.

export interface ProjectPart {
  label: string;
  image?: string;
  modelPath?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  tools: string[];
  partType: string;
  timeframe?: string;
  renderImage?: string;
  description: string[];
  modelPath?: string;
  explodedModelPath?: string;
  cameraMargin?: number; // tighter/looser camera framing for the 3D viewer (default 1.2)
  images?: string[];
  drawingImages?: string[];
  parts?: ProjectPart[];
}

export const projects: Project[] = [
  {
    id: "silent-float",
    title: "Toilet Fill Valve",
    category: "cad-assembly",
    categoryLabel: "CAD Assembly",
    tools: ["Siemens NX"],
    partType: "Assembly",
    renderImage: "/images/render-silent-float.png",
    description: [
      "A recreation of a toilet fill valve assembly in Siemens NX.",
      "Built to demonstrate modeling technique, assembly creation, and part-to-part relationships.",
    ],
    modelPath: "/models/silent_float_assy1.glb",
    cameraMargin: 0.75,
    drawingImages: [
      "/drawings/silent_float_assy_dwg_p1.png",
      "/drawings/silent_float_assy_dwg_p2.png",
      "/drawings/silent_float_assy_dwg_p3.png",
      "/drawings/silent_float_assy_dwg_p4.png",
      "/drawings/silent_float_assy_dwg_p5.png",
      "/drawings/silent_float_assy_dwg_p6.png",
      "/drawings/silent_float_assy_dwg_p7.png",
      "/drawings/silent_float_assy_dwg_p8.png",
    ],
  },
  {
    id: "box",
    title: "FSAE Check-In Box",
    category: "cad-assembly",
    categoryLabel: "CAD Assembly",
    tools: ["SolidWorks"],
    partType: "Enclosure Assembly",
    timeframe: "2025",
    renderImage: "/images/render-box.png",
    description: [
      "A custom enclosure designed in SolidWorks for an ID check-in system at Rensselaer Motorsport.",
      "Houses a breadboard, three LEDs, and an ID reader. Designed for easy storage and removal of components and quick iteration on design changes.",
    ],
    modelPath: "/models/box_assy1.glb",
  },
  {
    id: "truss-analysis",
    title: "Truss Structural Analysis",
    category: "structural-analysis",
    categoryLabel: "Structural Analysis",
    tools: ["SolidWorks Simulation"],
    partType: "Structural Study",
    timeframe: "2025",
    renderImage: "/images/truss1.png",
    description: [
      "A structural optimization study on a rear wing truss using SolidWorks Simulation.",
      "Increased factor of safety by 1.4 through geometry refinement and stress redistribution, aiding aero development for Rensselaer Motorsport's '25–'26 car.",
    ],
    images: ["/images/truss1.png", "/images/truss1.1.png"],
  },
  {
    id: "machined-lightsaber",
    title: "Machined Lightsaber Replica",
    category: "manufacturing",
    categoryLabel: "Manufacturing",
    tools: ["Manual Machining", "CNC Machining"],
    partType: "Single Part",
    renderImage: "/images/lightsaber.jpeg",
    description: [
      "A machined replica of a lightsaber hilt from Star Wars, built in an engineering processes class.",
      "The pictured piece was manually machined; a second copy was produced on a CNC. Emphasis on tolerances, surface finish, and mastery of manufacturing technique.",
    ],
  },

  // -- Add new projects below. Copy the shape below, then edit. --
  // {
  //   id: "unique-slug",
  //   title: "Project Title",
  //   category: "cad-assembly",
  //   categoryLabel: "CAD Assembly",
  //   tools: ["Software / Process"],
  //   partType: "Assembly",
  //   timeframe: "2026",
  //   renderImage: "/images/your-render.jpg",
  //   description: ["First paragraph.", "Second paragraph."],
  //   modelPath: "/models/your-model.glb",
  //   images: ["/images/extra-1.png"],
  //   drawingImages: [],
  //   parts: [{ label: "Bracket", image: "/images/bracket.png" }],
  // },
];
