import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";


export function createGameButtons(game) {
  const leftButton = new ButtonBuilder()
    .setCustomId(`move_left_${game.id}`) // unique per game
    .setEmoji(game.data.leftReact)       // reuse your emoji
    .setStyle(ButtonStyle.Secondary);

  const rightButton = new ButtonBuilder()
    .setCustomId(`move_right_${game.id}`)
    .setEmoji(game.data.rightReact)
    .setStyle(ButtonStyle.Secondary);

  return new ActionRowBuilder().addComponents(leftButton, rightButton);
}
