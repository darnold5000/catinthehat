export type SightingKind = "photo" | "trail-cam" | "window" | "roadside";

export type Sighting = {
  id: string;
  place: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  date: string;
  time: string;
  kind: SightingKind;
  cluster?: "nashville-south";
  witness: string;
  fileNumber: string;
  summary: string;
  details: string;
  oddities: string[];
  image: string;
  imageCaption: string;
};

export const SIGHTINGS: Sighting[] = [
  {
    id: "franklin",
    place: "Backyard on Cottonwood Lane",
    city: "Franklin",
    state: "TN",
    lat: 35.9251,
    lng: -86.8689,
    date: "October 2, 2026",
    time: "2:14 AM",
    kind: "photo",
    cluster: "nashville-south",
    witness: "The Cottonwood Lane porch cam",
    fileNumber: "TN-114",
    summary: "He stood by the swing set like he was waiting for the next turn.",
    details:
      "A Franklin family left the porch light on for the dog. At 2:14 AM the camera caught a lanky black cat standing upright in the grass, wearing a hat taller than the maple. The dog refused to go outside for three days. In the morning a single red-and-white striped sock was folded on the trampoline, as if someone had been very polite about leaving.",
    oddities: [
      "Hat taller than the backyard maple",
      "One striped sock, folded, on the trampoline",
      "Dog still will not look at the swing set",
    ],
    image: "/sightings/hatcat-franklin.jpg",
    imageCaption: "Porch camera still. Franklin, Tennessee.",
  },
  {
    id: "nolensville",
    place: "Mill Creek Greenway bridge",
    city: "Nolensville",
    state: "TN",
    lat: 35.9523,
    lng: -86.6694,
    date: "September 28, 2026",
    time: "7:41 PM",
    kind: "photo",
    cluster: "nashville-south",
    witness: "A jogger who now only runs at noon",
    fileNumber: "TN-109",
    summary: "Tip-tap, tip-tap, on the wooden bridge. Then a bow. Then fog.",
    details:
      "A jogger on the Mill Creek Greenway heard careful footsteps on the footbridge — too slow for a person, too tall for a regular cat. Fog rolled in off the creek. At the far end of the path stood the Visitor, hat first. He bowed. The phone only kept the hat. The rest of him went thin, like steam.",
    oddities: [
      "Footsteps counted as 1-2, 1-2, then stopped",
      "Photo captured the hat and almost none of the cat",
      "Creek went silent for eleven minutes",
    ],
    image: "/sightings/hatcat-nolensville.jpg",
    imageCaption: "Greenway at dusk. Nolensville, Tennessee.",
  },
  {
    id: "thompsons",
    place: "Empty rec-field window",
    city: "Thompson's Station",
    state: "TN",
    lat: 35.802,
    lng: -86.9064,
    date: "October 4, 2026",
    time: "9:03 PM",
    kind: "window",
    cluster: "nashville-south",
    witness: "A kid doing homework by the back window",
    fileNumber: "TN-118",
    summary: "He was on the soccer field. He waved. Homework was not finished.",
    details:
      "From a dark kitchen window, the soccer field behind the houses looked empty except for the moon. Then the hat rose over the far goal. The Visitor stood in the center circle and waved with one paw, slow and friendly, the way a substitute teacher waves. When the lights on the field flickered, he was gone. The grass in the center circle was pressed flat in the shape of two very small shoes and one very large brim.",
    oddities: [
      "Wave described as 'too polite'",
      "Center circle flattened in a brim shape",
      "Homework still incomplete",
    ],
    image: "/sightings/hatcat-thompsons.jpg",
    imageCaption: "Through the glass. Thompson's Station, Tennessee.",
  },
  {
    id: "spring-hill",
    place: "Deer camera at the tree line",
    city: "Spring Hill",
    state: "TN",
    lat: 35.7512,
    lng: -86.93,
    date: "September 19, 2026",
    time: "3:33 AM",
    kind: "trail-cam",
    cluster: "nashville-south",
    witness: "Trail camera #7 (meant for deer)",
    fileNumber: "TN-101",
    summary: "The deer never came. Something else looked into the lens.",
    details:
      "A Spring Hill trail camera was set for bucks. At 3:33 AM it fired. Frame one: a lanky black cat in a towering striped hat, staring straight into the infrared like he knew the password. Frame two: empty yard. Frame three: the bird feeder full of black jellybeans. The homeowner dumped the jellybeans. By morning the feeder was full again.",
    oddities: [
      "Timestamp stuck on 3:33 for two extra frames",
      "Bird feeder refilled with black jellybeans",
      "No deer on the card for the rest of the week",
    ],
    image: "/sightings/hatcat-springhill.jpg",
    imageCaption: "Infrared trail camera. Spring Hill, Tennessee.",
  },
  {
    id: "columbia",
    place: "Late-night grocery lot",
    city: "Columbia",
    state: "TN",
    lat: 35.6151,
    lng: -87.0353,
    date: "October 1, 2026",
    time: "11:47 PM",
    kind: "photo",
    cluster: "nashville-south",
    witness: "Night-shift cart collector",
    fileNumber: "TN-112",
    summary: "He was waiting in the far lane like the store owed him a box.",
    details:
      "The last cart collector in Columbia locked the doors and saw him under the one flickering lamp: upright, hat scraping the dark, standing beside a lonely shopping cart. He did not move. He appeared to be waiting for something that was not on sale. When the collector blinked, the cart was still there. The cat was not. Inside the cart: six identical cans of tuna and a child's drawing of a very tall hat.",
    oddities: [
      "Six cans of tuna, no receipt",
      "Child's hat drawing in the cart",
      "Lamp still flickers only in that lane",
    ],
    image: "/sightings/hatcat-columbia.jpg",
    imageCaption: "Grocery lot, one lamp. Columbia, Tennessee.",
  },
  {
    id: "fairview",
    place: "Shoulder of Highway 100",
    city: "Fairview",
    state: "TN",
    lat: 35.9817,
    lng: -87.1214,
    date: "October 5, 2026",
    time: "10:22 PM",
    kind: "roadside",
    cluster: "nashville-south",
    witness: "A driver who slowed down and then wished they had not",
    fileNumber: "TN-121",
    summary: "Headlights caught the hat first. The rest of him was already watching.",
    details:
      "West of Fairview, Highway 100 goes dark between the trees. A driver saw a stripe of red and white at the tree line and thought it was a surveying pole. It was not. The Visitor stood just off the asphalt, hat in the high beams, eyes like two dimes. He did not hitchhike. He did not run. He tipped the hat as the car passed. The radio, which had been playing a basketball game, played a music-box song for exactly eight seconds, then returned to the score.",
    oddities: [
      "Radio played a music-box tune for 8 seconds",
      "No corresponding pole in daylight",
      "Hat-tip confirmed by passenger",
    ],
    image: "/sightings/hatcat-fairview.jpg",
    imageCaption: "Highway 100 at night. Fairview, Tennessee.",
  },
  {
    id: "salem",
    place: "Woods off Witch Hill Road",
    city: "Salem",
    state: "MA",
    lat: 42.5195,
    lng: -70.8967,
    date: "October 31, 2025",
    time: "11:59 PM",
    kind: "photo",
    witness: "Tour-group straggler with a cheap flashlight",
    fileNumber: "MA-088",
    summary: "Salem has plenty of costumes. This one did not come off.",
    details:
      "A late walking tour lost one guest at the edge of the trees. The guest found the trees first. Between the trunks: a black cat standing like a butler, hat scraping fog. He did not say boo. He held still until the flashlight died, then the flashlight came back on, and the path was empty except for a little paper hat, perfectly folded, sitting on a stump.",
    oddities: [
      "Flashlight died and revived on its own",
      "Origami hat left on a stump",
      "Tour guide now counts guests twice",
    ],
    image: "/sightings/hatcat-salem.jpg",
    imageCaption: "Tree line after the tour. Salem, Massachusetts.",
  },
  {
    id: "new-orleans",
    place: "Gas-lamp alley off Royal",
    city: "New Orleans",
    state: "LA",
    lat: 29.9584,
    lng: -90.0644,
    date: "August 12, 2026",
    time: "1:12 AM",
    kind: "photo",
    witness: "A saxophone case and whoever was carrying it",
    fileNumber: "LA-044",
    summary: "He tipped his hat in the steam and the alley applauded itself.",
    details:
      "Rain turned a Quarter alley into a mirror. At the far end, under a sick gas lamp, the Visitor stood in the steam and tipped that impossible hat. A musician swore the bricks clapped, just once, like a polite audience. No one else was there. The next morning the lamp wouldn't light until someone said 'thank you' out loud, which the musician did, because New Orleans teaches you manners.",
    oddities: [
      "Bricks 'clapped' once",
      "Lamp refused to light until thanked",
      "Puddle reflected the hat after he was gone",
    ],
    image: "/sightings/hatcat-nola.jpg",
    imageCaption: "Wet alley, French Quarter. New Orleans, Louisiana.",
  },
  {
    id: "flagstaff",
    place: "Desert rest stop, northbound",
    city: "Flagstaff",
    state: "AZ",
    lat: 35.1983,
    lng: -111.6513,
    date: "July 4, 2026",
    time: "12:01 AM",
    kind: "photo",
    witness: "A family that only stopped for the vending machine",
    fileNumber: "AZ-017",
    summary: "He was beside the picnic table. The chips were already gone.",
    details:
      "A rest stop east of Flagstaff at midnight: one vending machine, one picnic table, a lot of quiet. The Visitor stood by the table in that tall striped hat as if he had been assigned the night shift. The family did not get out. They locked the doors and watched. He looked at the vending machine. The machine dropped a bag of chips with nobody paying. By the time they circled the lot, only the empty bag remained, folded into a tiny hat.",
    oddities: [
      "Vending machine vend with no coins",
      "Chip bag folded into a hat",
      "Picnic table frost in July",
    ],
    image: "/sightings/hatcat-flagstaff.jpg",
    imageCaption: "Rest stop after midnight. Flagstaff, Arizona.",
  },
  {
    id: "hoh",
    place: "Moss trail, Hoh Rain Forest",
    city: "Forks",
    state: "WA",
    lat: 47.8609,
    lng: -123.9346,
    date: "June 21, 2026",
    time: "4:44 AM",
    kind: "photo",
    witness: "A ranger who does not spook easily",
    fileNumber: "WA-009",
    summary: "The hat stuck up through the fog like a striped periscope.",
    details:
      "On the summer solstice a ranger walking the mossy loop saw the hat first — a red-and-white stack poking through fog above a fallen log. Then the yellow-green eyes. The Visitor stood as if the forest had grown him overnight. Birds did not sing. When the ranger blinked, the log was only a log. On it: wet pawprints in a straight, careful line, and one stripe of red mud that would not wash off in the rain.",
    oddities: [
      "Birds silent for the whole loop",
      "Straight-line pawprints on the log",
      "Red mud stripe that rain would not lift",
    ],
    image: "/sightings/hatcat-rainforest.jpg",
    imageCaption: "Moss and fog. Hoh Rain Forest, Washington.",
  },
  {
    id: "chicago",
    place: "Brick alley off Milwaukee",
    city: "Chicago",
    state: "IL",
    lat: 41.9103,
    lng: -87.6773,
    date: "January 9, 2026",
    time: "8:08 PM",
    kind: "photo",
    witness: "Third-floor apartment, fire-escape view",
    fileNumber: "IL-061",
    summary: "He was in the alley looking up, like he had the wrong window.",
    details:
      "Sodium streetlight. Dumpsters. A fire escape. From a third-floor kitchen someone looked down and saw the Visitor in the alley, hat taller than the first landing, staring up as if he had an appointment. He did not climb. He waited. Then he looked at the next window over, decided that was not it either, and walked around the corner on two legs. The building cats yowled in a chord that nobody has been able to hum since.",
    oddities: [
      "Looked at two windows, then left",
      "Building cats yowled in one chord",
      "Snow in the alley melted only under the brim",
    ],
    image: "/sightings/hatcat-chicago.jpg",
    imageCaption: "Alley, looking up. Chicago, Illinois.",
  },
  {
    id: "key-west",
    place: "End of an empty pier",
    city: "Key West",
    state: "FL",
    lat: 24.5551,
    lng: -81.78,
    date: "May 3, 2026",
    time: "2:00 AM",
    kind: "photo",
    witness: "Night fisherman who caught nothing after",
    fileNumber: "FL-033",
    summary: "He stood at the end of the dock like the ocean had invited him.",
    details:
      "The pier was empty except for a lanky black cat at the last plank, hat against the moon, looking at the water as if something down there owed him a story. The fisherman did not call out. The Visitor turned, put one paw to the brim, and the tide made a little clap. After that the fish stopped biting until sunrise. A pelican sat where he had stood and would not move until someone said, quietly, 'excuse me.'",
    oddities: [
      "Tide clapped once",
      "No fish until sunrise",
      "Pelican held the spot like a usher",
    ],
    image: "/sightings/hatcat-keys.jpg",
    imageCaption: "Empty pier. Key West, Florida.",
  },
];

export const PORTRAIT_SRC = "/sightings/hatcat-portrait.jpg";

export function getSighting(id: string): Sighting | undefined {
  return SIGHTINGS.find((s) => s.id === id);
}

export const TENNESSEE_CLUSTER = SIGHTINGS.filter((s) => s.cluster === "nashville-south");

export const US_CENTER: [number, number] = [39.5, -96.5];
export const US_ZOOM = 4;
export const TENNESSEE_CENTER: [number, number] = [35.82, -86.88];
export const TENNESSEE_ZOOM = 9;
export const YOU_ARE_HERE: [number, number] = [35.7548, -86.9185];
export const YOU_ARE_HERE_ZOOM = 12;
