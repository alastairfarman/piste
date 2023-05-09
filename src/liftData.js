const { format, utcToZonedTime } = require("date-fns-tz");

export default function getLiftStatuses() {
  // Get the current time in the Europe/Paris timezone
  const now = new Date();
  const timezone = "Europe/Paris";
  const zonedTime = utcToZonedTime(now, timezone);
  const timeString = format(zonedTime, "HH:mm");

  // Define the ski lifts and their open/closed/ooo status
  const skiLifts = [
    {
      name: "Vanoise Express",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Télémetro",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Grande Rochette",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Télébus",
      status: timeString >= "08:00" && timeString < "18:00" ? "open" : "closed",
    },
    {
      name: "Lac Noir",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Télébuffette",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Montalbert",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Champagny",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Bellecôte",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Coches",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Roche de Mio",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Belle Plagne",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Les Colosses",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Arpette",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "La Lovatière",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Inversens",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Crozats",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Les Envers",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Bécoin",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Verdons Sud",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Bergerie",
      status: "ooo",
    },
    {
      name: "Plan Bois",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "La Roche",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Bijolin",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Carella",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Blanchets",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Borseliers",
      status: "ooo",
    },
    {
      name: "La Rossa",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Colorado",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Pierres Blanches",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Les Quillis",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Montchavin",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Les Bauches",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Traversée",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Mélèzes",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Glacier",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "1800",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Boulevard",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Dos Rond",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Adrets",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Golf",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Chalet de Bellecôte",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Dou du Praz",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Ecole Plagne-Montalbert",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Gentil",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Aime-La Plagne",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Stade",
      status: timeString >= "09:00" && timeString < "16:00" ? "open" : "closed",
    },
    {
      name: "Eterlou",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Grenouilles",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Petit Sauget",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Praconduit",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Tyrolien",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Grangette",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Borseliers 3",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Plan Leschaux",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Col de Forcle",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Chevrette",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Biquet",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Aollets",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Crêtes",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "France",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Dromadaires",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Aiglon",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Patinoire",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Plateau Carella",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Replat",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Sucette",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Solu",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Ange",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Belle Plagne",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Indiens",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Ourson",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
    {
      name: "Petits Loups",
      status: timeString >= "08:30" && timeString < "16:30" ? "open" : "closed",
    },
  ];

  // Calculate the total number of lifts that are open, closed, or ooo
  let openCount = 0;
  let closedCount = 0;
  let oooCount = 0;

  for (const lift of skiLifts) {
    if (lift.status === "open") {
      openCount++;
    } else if (lift.status === "closed") {
      closedCount++;
    } else {
      oooCount++;
    }
  }

  const statusSummary = {
    open: openCount,
    closed: closedCount,
    ooo: oooCount,
  };

  return { skiLifts, statusSummary };
}
