import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
// import { moveData } from "./objects/moveGame/moveData.js"

export function createGameButtons(game, initials) {


    const buttons = game.data.moves.map(move =>
    new ButtonBuilder()
      .setCustomId(`move_${move.id}_${game.id}`)
      .setEmoji(move.emoji)
      .setStyle(ButtonStyle.Secondary)
  );


  return new ActionRowBuilder().addComponents(buttons);
}
