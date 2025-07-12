import type { TreeNode } from '../types/tree';

const images: Record<string, string> = {
  marsupials: "https://i.ibb.co/yFymcB7r/marsupials.png",
  monotremes: "https://i.ibb.co/TBS5kkrr/monotreme.png",
  placentals: "https://i.ibb.co/cKrXTQ9d/placentals.png",
  platypus: "https://i.ibb.co/0yhf85cs/platypus.png",
  echidna: "https://i.ibb.co/LXfzr8R7/echidna.png",
  "red kangaroo": "https://i.ibb.co/1tK1Z1Ht/kangaroo.png",
  koala: "https://i.ibb.co/yBSW8fpR/koala.png",
  carnivora: "https://i.ibb.co/1wYmsP5/carnivora.png",
  primates: "https://i.ibb.co/w9gtfyD/primates.png",
  wolf: "https://i.ibb.co/BHP4VbQY/wolf.png",
  tiger: "https://i.ibb.co/nNchn0vs/tiger.png",
  human: "https://i.ibb.co/2Hp9fzF/human.png",
  chimpanzee: "https://i.ibb.co/3QnChC0/chimpanzee.png",
};

const facts: Record<string, string> = {
  marsupials:
    "Marsupials give birth to underdeveloped young that continue growing in a pouch. They include kangaroos, koalas, wallabies, and wombats.",
  monotremes:
    "Monotremes are egg-laying mammals, a group that includes only the platypus and echidnas. They are found exclusively in Australia and New Guinea.",
  placentals:
    "Placentals are mammals whose young develop fully inside the mother’s womb before birth. This group includes humans, dogs, cats, and whales.",
  platypus:
    "The platypus is one of the only mammals that lays eggs and has a duck-like bill. Males have venomous spurs on their hind legs.",
  human:
    "Humans are the only primates capable of complex language, technology, and cultural evolution. They have colonized every continent on Earth.",
  chimpanzee:
    "Chimpanzees are one of our closest living relatives, sharing about 98.8% of our DNA. They use tools, show emotions, and live in complex social groups.",
  tiger:
    "Tigers are the largest wild cats and can weigh over 300 kg. Each tiger has a unique stripe pattern, like a fingerprint.",
  wolf: "Wolves are highly social animals that live and hunt in packs. They communicate through howls, body language, and scent marking.",
  echidna:
    "Echidnas are spiny anteaters that use their long, sticky tongues to catch insects. Like platypuses, they lay eggs and are monotremes.",
  "red kangaroo":
    "Red kangaroos are the largest marsupial species and can leap over 8 meters in a single bound. Males are often reddish-brown while females are bluish-grey",
  koala:
    "Koalas sleep up to 20 hours a day and eat only eucalyptus leaves. They are marsupials, and their babies (joeys) develop in a pouch.",
};

export function getAnimalImage(child: TreeNode): string {
  const name = child.type === 'branch' ? child.label : child.data.name;
  return images[name];
}

export function getFacts(child: TreeNode): string {
  const name = child.type === 'branch' ? child.label : child.data.name;
  return facts[name];
} 