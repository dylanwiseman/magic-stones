import "./App.css";
import React, { useEffect, useState } from "react";
import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText, generateText } from 'ai';

function App() {
  const rows = 31;
  const cols = 31;
  const radius = 15;

  const [colors, setColors] = useState(Array(rows * cols).fill("#000000"));
  const [name, setName] = useState("No Marble");
  const [description, setDescription] = useState("No description");

  const [initial, setInitial] = useState(true);

  const shine = [
    198, 199, 200, 228, 229, 230, 258, 259, 260, 288, 289, 290, 318, 319, 320,
    350, 378, 379, 409, 410,
  ];
  const dark = [
    687, 718, 719, 788, 720, 555, 585, 586, 615, 616, 617, 645, 646, 647, 675,
    676, 677, 678, 705, 706, 707, 708, 735, 736, 737, 738, 739, 734, 762, 763,
    764, 765, 766, 767, 768, 769, 750, 752, 751, 753, 524,
  ];

  const magicalAdjectives = [
    "Blessed",
    "Cursed",
    "Lucky",
    "Unlucky",
    "Dangerous",
    "Mysterious",
    "Enchanted",
    "Protective",
    "Ancient",
    "Powerful",
    "Cursed",
    "Sacred",
    "Glowing",
    "Enigmatic",
    "Radiant",
    "Alluring",
    "Magnetic",
    "Charmed",
    "Mystical",
    "Arcane",
    "Legendary",
    "Divine",
    "Enchanted",
    "Secretive",
    "Shadowy",
    "Shimmering",
    "Shrouded",
    "Unseen",
    "Unbreakable",
    "Swift",
    "Elemental",
    "Bewitched",
    "Resilient",
    "Empowered",
    "Transcendent",
    "Timeless",
    "Spellbound",
    "Mesmerizing",
    "Enveloping",
    "Flickering",
    "Ensnaring",
    "Encompassing",
    "Omniscient",
    "Imbued",
    "Venerable",
    "Inscrutable",
    "Immutable",
    "Arcanum",
    "Arcadian",
    "Effulgent",
    "Augmented",
    "Luminous",
    "Celestial",
    "Diaphanous",
    "Effervescent",
    "Ephemeral",
    "Ethereal",
    "Ineffable",
    "Insouciant",
    "Intrepid",
    "Labyrinthine",
    "Mellifluous",
    "Mercurial",
    "Mystic",
    "Nebulous",
    "Numinous",
    "Ominous",
    "Phantasmagoric",
    "Pneumatic",
    "Pulsating",
    "Quixotic",
    "Redolent",
    "Serendipitous",
    "Serpentine",
    "Sonorous",
    "Sovereign",
    "Sublime",
    "Supernatural",
    "Telekinetic",
    "Tempestuous",
    "Terrestrial",
    "Timeworn",
    "Transcendental",
    "Transmundane",
    "Transcendent",
    "Translucent",
    "Transmutable",
    "Undulating",
    "Unfathomable",
    "Unseen",
    "Untouchable",
    "Uplifting",
    "Venerated",
    "Vibrant",
    "Virtuous",
    "Visionary",
    "Vivacious",
    "Wondrous",
    "Xenial",
    "Zephyrous",
  ];

  const soughtOrAvoidedNouns = [
    "Money",
    "Power",
    "Peace",
    "Love",
    "Destruction",
    "Fear",
    "Death",
    "Enlightenment",
    "Wisdom",
    "Stupidity",
    "Happiness",
    "Knowledge",
    "Fame",
    "Fortune",
    "Glory",
    "Health",
    "Hope",
    "Immortality",
    "Justice",
    "Luck",
    "Pleasure",
    "Salvation",
    "Security",
    "Serenity",
    "Success",
    "Truth",
    "Vengeance",
    "Victory",
    "Beauty",
    "Chaos",
    "Order",
    "Compassion",
    "Confidence",
    "Courage",
    "Creativity",
    "Curiosity",
    "Dignity",
    "Discipline",
    "Duty",
    "Empathy",
    "Endurance",
    "Freedom",
    "Friendship",
    "Harmony",
    "Humility",
    "Independence",
    "Innovation",
    "Integrity",
    "Intelligence",
    "Leadership",
    "Loyalty",
    "Moderation",
    "Passion",
    "Perseverance",
    "Purity",
    "Revenge",
    "Self-control",
    "Self-esteem",
    "Selflessness",
    "Strength",
    "Tolerance",
    "Unity",
    "Valor",
    "Wealth",
    "Willpower",
    "Zeal",
    "Anger",
    "Jealousy",
    "Misfortune",
    "Confusion",
    "Despair",
    "Anxiety",
    "Loneliness",
    "Grief",
    "Poverty",
    "Suffering",
    "Failure",
    "Betrayal",
    "Humiliation",
    "Injustice",
    "Discrimination",
    "Weakness",
    "Depression",
    "Pain",
    "Trauma",
    "Disappointment",
    "Rejection",
    "Boredom",
    "Desperation",
    "Ignorance",
    "Temptation",
    "Pride",
    "Greed",
    "Lust",
    "Envy",
    "Gluttony",
    "Wrath",
    "Sloth",
  ];

  const whimsicalAdjectives = [
    "Infinite",
    "Fiery",
    "Exciting",
    "Wild",
    "Fleeting",
    "Immediate",
    "Gnawing",
    "Invisible",
    "Sparkling",
    "Mystical",
    "Luminous",
    "Ephemeral",
    "Radiant",
    "Silent",
    "Whispering",
    "Vibrant",
    "Ethereal",
    "Elusive",
    "Flickering",
    "Gossamer",
    "Spectral",
    "Translucent",
    "Transparent",
    "Illusory",
    "Nebulous",
    "Prismatic",
    "Shimmering",
    "Hazy",
    "Dreamy",
    "Blazing",
    "Glowing",
    "Phantasmagorical",
    "Enchanted",
    "Enigmatic",
    "Mysterious",
    "Astral",
    "Celestial",
    "Cosmic",
    "Magical",
    "Mythical",
    "Supernatural",
    "Otherworldly",
    "Surreal",
    "Whimsical",
    "Wonderous",
    "Curious",
    "Fantastical",
    "Curved",
    "Spiraling",
    "Twisted",
    "Serendipitous",
    "Playful",
    "Sprightly",
    "Jazzy",
    "Melodic",
    "Harmonious",
    "Melancholic",
    "Lyrical",
    "Dancing",
    "Graceful",
    "Effervescent",
    "Breezy",
    "Refreshing",
    "Irreverent",
    "Peculiar",
    "Quirky",
    "Fanciful",
    "Capricious",
    "Wistful",
    "Eclectic",
    "Intriguing",
    "Captivating",
    "Alluring",
    "Mesmerizing",
    "Bewitching",
    "Enchanting",
    "Entrancing",
    "Spellbinding",
    "Euphoric",
    "Blissful",
    "Ecstatic",
    "Joyful",
    "Sensual",
    "Sultry",
    "Passionate",
    "Provocative",
    "Mesmerizing",
    "Bewildering",
    "Confounding",
    "Baffling",
    "Perplexing",
    "Mind-boggling",
    "Absurd",
    "Whacky",
    "Zany",
    "Kooky",
    "Offbeat",
    "Wacky",
    "Hilarious",
    "Laughable",
    "Amusing",
    "Entertaining",
  ];

  function adjust(color, amount) {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
              16
            )
          ).substr(-2)
        )
    );
  }

  // function checkAndSetCookie(cookieName, cookieValue) {
  //   var existingCookie = localStorage.getItem(cookieName);
  //   if (existingCookie === null) {
  //     localStorage.setItem(cookieName, cookieValue);
  //   }
  //   return existingCookie;
  // }

  const newName = () => {
    return `${
      magicalAdjectives[Math.floor(Math.random() * magicalAdjectives.length)]
    } Marble of ${
      whimsicalAdjectives[
        Math.floor(Math.random() * whimsicalAdjectives.length)
      ]
    } ${
      soughtOrAvoidedNouns[
        Math.floor(Math.random() * soughtOrAvoidedNouns.length)
      ]
    }`;
  };

  const handleMagicMarble = async () => {
    // if (checkAndSetCookie()) return;
    setInitial(false);

    const result = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt:
        `Given the name of this magical marble, write a 1 sentence description of what magic it might do to the person who carries it: ${name}`,
    });
    setDescription(result);
    
    const numberOfColors = Math.floor(Math.random() * 4);
    let randomColors = [
      "#" + Math.floor(Math.random() * 16777215).toString(16),
    ];
    if (numberOfColors === 0)
      randomColors.push(
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );
    else if (numberOfColors === 1)
      randomColors.push(
        "#" + Math.floor(Math.random() * 16777215).toString(16),
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );
    else if (numberOfColors === 2)
      randomColors.push(
        "#" + Math.floor(Math.random() * 16777215).toString(16),
        "#" + Math.floor(Math.random() * 16777215).toString(16),
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

    const newColors = colors.map((color, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const dist = Math.sqrt(
        Math.pow(row - rows / 2, 2) + Math.pow(col - cols / 2, 2)
      );
      if (dist <= radius) {
        let color =
          randomColors[Math.floor(Math.random() * randomColors.length)];
        if (i > 781 || dark.includes(i)) color = adjust(color, -80);
        return dist <= radius - 2 ? color : "#000000";
      } else {
        return "#000000";
      }
    });
    setColors(newColors);
    setName(newName());
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              backgroundColor: "black",
              width: "300px",
              height: "300px",
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 10px)`,
              gap: "0",
              padding: "10px",
            }}
          >
            {colors.map((color, i) => {
              if (!initial && shine.includes(i)) color = "white";
              return (
                <div
                  key={i}
                  style={{ backgroundColor: color }}
                  id={`${i}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!initial && (
          <>
            <div
              style={{
                padding: "1em",
                paddingBottom: "0",
                color: "white",
                width: "300px",
              }}
            >
              {name}
            </div>
            <div style={{ padding: "1em", color: "white", width: "300px" }}>
              {description}
            </div>
          </>
        )}
        <button
          style={{
            width: "300px",
          }}
          onClick={handleMagicMarble}
        >
          Find Magic Marble
        </button>
      </div>
    </>
  );
}

export default App;
