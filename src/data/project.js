export const project = {
  site: {
    name: "Instant Fold",
    description:
      "Instant Fold: In-Context Imitation Learning for Deformable Manipulation.",
  },
  hero: {
    title: "Instant Fold: In-Context Imitation Learning for Deformable Manipulation",
    venue: "Under Review",
    authors: [{ name: "Anonymous Authors" }],
    actions: [
      { label: "Paper", href: "#", external: false },
    ],
    teaserVideo: "/assets/videos/obact_animation.mp4",
    teaserPoster: "/assets/posters/teaser.jpg",
    teaserCaption:
      "At test time, we optimize the camera position to an optimal viewpoint closest to the demonstration and minimally occluded by leveraging 3D Gaussian Splatting from sparse-view images for view-conditioned imitation learning.",
  },
  zeroShotSim2Real: {
    title: "Zero-Shot Sim2Real with Human Demonstration",
    videos: [
      { video: "/assets/videos/one-shot-videos/1.mp4" },
      { video: "/assets/videos/one-shot-videos/2.mp4" },
    ],
  },
  videoSets: {
    pink: {
      label: "Shirt 1",
      videos: [
        { label: "Clip 1", video: "/assets/videos/pink/1.mp4" },
        { label: "Clip 2", video: "/assets/videos/pink/2.mp4" },
        { label: "Clip 3", video: "/assets/videos/pink/3.mp4" },
        { label: "Clip 4", video: "/assets/videos/pink/4.mp4" },
      ],
    },
    navy_blue: {
      label: "Shirt 2",
      videos: [
        { label: "Clip 1", video: "/assets/videos/navy_blue/1.mp4" },
        { label: "Clip 2", video: "/assets/videos/navy_blue/2.mp4" },
        { label: "Clip 3", video: "/assets/videos/navy_blue/3.mp4" },
        { label: "Clip 4", video: "/assets/videos/navy_blue/4.mp4" },
      ],
    },
    blue_short: {
      label: "Short 1",
      videos: [
        { label: "Clip 1", video: "/assets/videos/blue_short/1.mp4" },
        { label: "Clip 2", video: "/assets/videos/blue_short/2.mp4" },
        { label: "Clip 3", video: "/assets/videos/blue_short/3.mp4" },
        { label: "Clip 4", video: "/assets/videos/blue_short/4.mp4" },
      ],
    },
    purple_short: {
      label: "Short 2",
      videos: [
        { label: "Clip 1", video: "/assets/videos/purple_short/1.mp4" },
        { label: "Clip 2", video: "/assets/videos/purple_short/2.mp4" },
      ],
    },
    black_dress: {
      label: "Blouse 1",
      videos: [
        { label: "Clip 1", video: "/assets/videos/black_dress/1.mp4" },
        { label: "Clip 2", video: "/assets/videos/black_dress/2.mp4" },
        { label: "Clip 3", video: "/assets/videos/black_dress/3.mp4" },
        { label: "Clip 4", video: "/assets/videos/black_dress/4.mp4" },
      ],
    },
    pink_dress: {
      label: "Blouse 2",
      videos: [
        { label: "Clip 1", video: "/assets/videos/pink_dress/1.mp4" },
        { label: "Clip 2", video: "/assets/videos/pink_dress/2.mp4" },
      ],
    },
    black_sports: {
      label: "Training Jacket",
      videos: [
        { label: "Clip 1", video: "/assets/videos/black_sports/1.mp4" },
        { label: "Clip 2", video: "/assets/videos/black_sports/2.mp4" },
      ],
    },
  },
  abstract: [
    "Humans rarely rely on language instructions when learning complex deformable manipulation skills; instead, video demonstrations convey temporal structure, intermediate goals, and subtle spatial conventions that are difficult to verbalize. We introduce Instant-Fold, an in-context imitation learning framework for deformable object manipulation. Given a single human demonstration, our policy infers diverse manipulation strategies and executes them without requiring gradient updates. Our approach disentangles topological understanding from functional reasoning: deformation-aware geo-semantic representations are first learned through temporal contrastive pretraining, after which a demonstration-conditioned flow-matching transformer generates the corresponding manipulation behavior. Trained entirely in simulation, Instant-Fold generalizes across diverse folding strategies and transfers zero-shot to real-world settings without additional fine-tuning."
  ],
};
