import express from 'express';
import cors from 'cors';

import { prisma } from './database/prisma';
import { convertHoursStringToMinutes } from './utils/convert-hours-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.post('/games/:id/ads', async (req, res) => {
  const {
    name,
    discord,
    yearsPlaying,
    weekDays,
    hoursStart,
    hoursEnd,
    useVoiceChannel,
  } = req.body;

  const gameId = req.params.id;

  const ad = await prisma.ad.create({
    data: {
      name,
      discord,
      yearsPlaying,
      weekDays: weekDays.join(','),
      hoursStart: convertHoursStringToMinutes(hoursStart),
      hoursEnd: convertHoursStringToMinutes(hoursEnd),
      useVoiceChannel,
      gameId,
    },
  });

  return res.status(201).json(ad);
});

//anúncios pelo id do game
app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hoursStart: true,
      hoursEnd: true,
      useVoiceChannel: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        hoursStart: convertMinutesToHourString(ad.hoursStart),
        hoursEnd: convertMinutesToHourString(ad.hoursEnd),
        weekDays: ad.weekDays.split(','),
      };
    })
  );
});

//discord pelo id do ad
app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findFirstOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return res.json({
    discord: ad.discord,
  });
});

app.listen(3001, () => console.log('Backend running on port ' + PORT));
