export const project = {
  site: {
    name: "Instant‑Fold",
    description:
      "Instant‑Fold: In-Context Imitation Learning for Deformable Object Manipulation.",
  },
  hero: {
    title: "Instant‑Fold: In-Context Imitation Learning for Deformable Object Manipulation",
    venue: "Under Review",
    authors: [{ name: "Anonymous Authors" }],
    actions: [
      { label: "Paper", href: "#", external: false },
    ],
    teaserVideo: "/assets/videos/teaser.mp4",
    teaserCaption:
      "Given a single human demonstration as a prompt, Instant‑Fold infers and executes diverse manipulation modes directly from the demonstration without requiring gradient updates.",
  },
  zeroShotSim2Real: {
    title: "Zero-Shot Sim2Real with Human Demonstration",
    videos: [
      { video: "/assets/videos/one-shot-videos/1.mp4" },
      { video: "/assets/videos/one-shot-videos/2.mp4" },
      { video: "/assets/videos/one-shot-videos/3.mp4" },
      { video: "/assets/videos/one-shot-videos/4.mp4" },
    ],
  },
  flowMatching: {
    title: "In-Context Policy Learning",
    description:
      "During policy learning, the model performs demonstration-conditioned flow matching using pretrained visual tokens.",
    video: "/assets/videos/conditional_denoise.mp4",
  },
  videoSets: {
    pink: {
      label: "Shirt 1",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/pink/1.mp4" },
        { label: "Sleeve: center | Body: top down | Left-first", video: "/assets/videos/pink/2.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Right-first", video: "/assets/videos/pink/3.mp4" },
        { label: "Sleeve: center | Body: bottom up | Left-first", video: "/assets/videos/pink/4.mp4" },
      ],
    },
    navy_blue: {
      label: "Shirt 2",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/navy_blue/1.mp4" },
        { label: "Sleeve: diagonal | Body: bottom up | Left-first (Unseen)", video: "/assets/videos/navy_blue/2.mp4" },
        { label: "Sleeve: down | Body: bottom up | Simultaneous", video: "/assets/videos/navy_blue/3.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/navy_blue/4.mp4" },
      ],
    },
    blue_short: {
      label: "Short 1",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/blue_short/1.mp4" },
        { label: "Sleeve: asymmetric | Body: top down | Left-first", video: "/assets/videos/blue_short/2.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/blue_short/3.mp4" },
        { label: "Sleeve: center | Body: bottom up | Left-first", video: "/assets/videos/blue_short/4.mp4" },
      ],
    },
    purple_short: {
      label: "Short 2",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/purple_short/1.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/purple_short/2.mp4" },
      ],
    },
    black_dress: {
      label: "Blouse 1",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/black_dress/1.mp4" },
        { label: "Sleeve: center | Body: top down | Left-first", video: "/assets/videos/black_dress/2.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/black_dress/3.mp4" },
        { label: "Sleeve: diagonal | Body: bottom up | Left-first", video: "/assets/videos/black_dress/4.mp4" },
      ],
    },
    pink_dress: {
      label: "Blouse 2",
      videos: [
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/pink_dress/1.mp4" },
        { label: "Sleeve: center | Body: bottom up | Left-first", video: "/assets/videos/pink_dress/2.mp4" },
      ],
    },
    black_sports: {
      label: "Jacket 1",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/black_sports/1.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/black_sports/2.mp4" },
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/black_sports/3.mp4" },
      ],
    },
    Denim_jacket: {
      label: "Jacket 2",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/denim_jacket/1.mp4" },
      ],
    },
  },
  failureModes: {
    title: "Failure Modes",
    description: "Common failure modes.",
  modes: [
    {
      key: "Kinematic Failure",
      label: "Kinematic Failure",
      video: "/assets/videos/failures/failure_workspace_limits.mp4",
      description:
        "The robot reaches the limits of its workspace or a kinematic singularity, preventing it from continuing to execute the policy. This can be addressed by incorporating kinematic modeling during data generation or by including data that teaches the robot to rearrange the cloth to satisfy kinematic constraints.",
    },
    {
      key: "Robot Occlusion",
      label: "Robot Occlusion",
      video: "/assets/videos/failures/failure_occ.mp4",
      description:
        "The robot occludes the cloth from the camera's view, causing the segmentation model or the policy to lose track of the cloth state and fail to complete the fold. This can be mitigated by using a more strategically placed camera or incorporating a secondary camera view.",
    },
    {
      key: "Physics Mismatch",
      label: "Physics Mismatch",
      video: "/assets/videos/failures/failure_detim.mp4",
      description:
        "The simulated cloth physics do not perfectly match the real world, leading to unexpected behavior that causes failures when handling out-of-distribution garments (e.g., high-stiffness garments). This can be mitigated by improving simulation fidelity and randomizing physics parameters during data generation.",
    },
    {
      key: "Sliding",
      label: "Sliding",
      video: "/assets/videos/failures/failure_sliding.mp4",
      description:
        "The garment slides on the table during simultaneous manipulation, causing the fold to fail. This can be mitigated by improving friction between the garment and the table or by using one arm to stabilize the garment while the other executes the fold.",
    },
    {
      key: "Grip-slip",
      label: "Grip Slip",
      video: "/assets/videos/failures/failure_grip_slip.mp4",
      description:
        "The grasp loses traction under tension when the two arms stretch, causing the cloth to slip before the fold can complete cleanly. This can be mitigated by improving the gripper design.",
    },
  ]
  },
  abstract: [
    "Deformable object manipulation (DOM) is challenging due to high-dimensional, partially observable states that evolve through long-horizon, topology-changing interactions with multiple valid manipulation modes. We introduce Instant‑Fold, an in-context imitation learning framework for DOM. Given a single human demonstration, our policy infers and executes diverse manipulation modes directly from the demonstration—including variations in spatial execution and ordering—without requiring gradient updates. Our approach first learns deformation-aware visual representations via temporal contrastive pretraining, after which a flow-matching transformer policy conditioned on the demonstration predicts actions to execute the intended manipulation mode. Trained entirely in simulation, Instant‑Fold generalizes across diverse folding modes and transfers zero-shot to real-world settings without additional data collection or finetuning."
  ],
};
