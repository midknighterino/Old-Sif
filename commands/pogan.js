exports.run = async (client, message) => {

  let arr1 = ["Anti-", "Pro-", "Semi-", "Crypto-", "Pseudo-", "Super-", "Hyper-", "Ultra-", "Uber-", "Far-Right", "Far-Left", "Centrist", "Centre-Right", "Centre-Left", "Alt-", "Alt-Right", "Alt-Left", "Post-Right", "Post-Left", "Post-", "Neo-", "New", "Old", "Semi-", "Demi-", "Mono-", "Poly-","Extremist", "Moderate","Homo-", "Hetero-", "Cis-", "Pan-", "Trans-", "Queer", "Bi-", "Vegan", "Green", "Red", "Blue", "White", "Black", "Asian", "Men's", "Women's", "People's","Anarcho-", "Monarcho-", "Oglio-", "Paleo-", "Techno-", "Cyber-", "Eco-", "A-", "Bright", "Dark", "E-", "Ethno-", "Libertarian", "Authoritarian", "Liberal", "National", "Social", "Market", "Pragmatic", "Romantic", "Individualistic", "Collectivistic", "Theistic", "Atheistic", "Religious", "Secular", "Christian", "Islamic", "Hindu", "Buddhist", "American", "European", "Asian", "Chinese", "Native", "Nihilistic", "Egotistic", "Altruistic","Pacifistic", "Primitivistic", "Modern", "Postmodernist", "Classical", "Paleo-", "Progressive", "Conservative", "Reactionary", "Revolutionary", "Reformist", "Democratic", "Humanist", "Spiritual", "Free-", "Syndicalist", "Cultural", "Fiscal", "Global", "Regional", "Local", "Paternal", "Maternal", "One-", "Monarchist", "Absolutist", "Constitutional", "Feudalist", "Separatist", "State", "Establishment", "Theocratic", "Technocratic", "Aristocratic", "Plutocratic", "Technocratic", "Meritocratic", "Consequentialist", "Objectivist", "Voluntarist", "Illiberal", "Bio-", "Civic", "Ethno-", "Darwinist", "Difference", "Equality", "Proto-", "Russian", "Supremacist", "Jewish", "Zionist", "Gay", "Lesbian", "Egalitarian", "Identity", "Syn-", "Syncretic", "Third Way", "Third Position", "Welfare", "Bourgeois", "Proletariat", "Chauvinist", "Corporatist", "Economic", "Ethical", "Ethnic", "Expansionist", "Imperialist", "Jingoistic", "Clerical", "Bolshevic", "Multi-", "Multicultural", "Popular", "Nativist", "Fundamentalist", "Orthodox", "Heterodox", "Elitist", "Labour", "Inclusive", "Scientific", "Ontological"];

  let arr2 = ["anti-", "pro-", "semi-", "crypto-", "pseudo-", "super-", "hyper-", "ultra-", "uber-", "far-right", "far-left", "centrist", "centre-right", "centre-left", "alt-", "alt-Right", "alt-Left", "post-right", "post-left", "post-", "neo-", "new", "old", "semi-", "demi-", "mono-", "poly-","extremist", "moderate","homo-", "hetero-", "cis-", "pan-", "trans-", "queer", "bi-", "vegan", "green", "red", "blue", "white", "black", "asian", "men's", "women's", "people's","anarcho-", "monarcho-", "oglio-", "paleo-", "techno-", "cyber-", "eco-", "a-", "bright", "dark", "e-", "ethno-", "libertarian", "authoritarian", "liberal", "national", "social", "market", "pragmatic", "romantic", "individualistic", "collectivistic", "theistic", "atheistic", "religious", "secular", "christian", "islamic", "hindu", "buddhist", "american", "european", "asian", "chinese", "native", "nihilistic", "egotistic", "altruistic","pacifistic", "primitivistic", "modern", "postmodernist", "classical", "paleo-", "progressive", "conservative", "reactionary", "revolutionary", "reformist", "democratic", "humanist", "spiritual", "free-", "syndicalist", "cultural", "fiscal", "global", "regional", "local", "paternal", "maternal", "one-", "monarchist", "absolutist", "constitutional", "feudalist", "separatist", "state", "establishment", "theocratic", "technocratic", "aristocratic", "plutocratic", "technocratic", "meritocratic", "consequentialist", "objectivist", "voluntarist", "illiberal", "bio-", "civic", "ethno-", "darwinist", "difference", "equality", "proto-", "russian", "supremacist", "jewish", "zionist", "gay", "lesbian", "egalitarian", "identity", "syn-", "syncretic", "third Way", "third position", "welfare", "bourgeois", "proletariat", "chauvinist", "corporatist", "economic", "ethical", "ethnic", "expansionist", "imperialist", "jingoistic", "clerical", "bolshevic", "multi-", "multicultural", "popular", "nativist", "fundamentalist", "orthodox", "heterodox", "elitist", "labour", "inclusive", "scientific", "ontological"];

  let arr3 = ["anarchism", "absolutism", "communism", "conservatism", "environmentalism", "fascism", "liberalism", "nationalism", "socialism", "capitalism", "democracy", "marxism", "feminism"];

  let str = `${arr1.random()} ${arr2.random()} ${arr3.random()}`;

  message.channel.send(str);
  
};


exports.help = {
  name: "pogan",
  description: "Randomly generate a political ideology. Over 300,000 possibilities availiable!",
  usage: ".pogan",
  category: "Fun"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pogbot", "pobot"],
  permLevel: "User"
};