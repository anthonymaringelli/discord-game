const collector = sentMsg.createMessageComponentCollector({
  time: 60000
});

collector.on("collect", async (interaction) => {

  // only allow game owner
  if (interaction.user.id !== this.states.userId) {
    await interaction.reply({ content: "Not your game.", ephemeral: true });
    return;
  }

  if (interaction.customId.includes("move_left")) {
    this.moveLeft();
  }

  if (interaction.customId.includes("move_right")) {
    this.moveRight();
  }

  await interaction.update({
    content: this.renderBoard(),
    components: [createGameButtons(this)]
  });
});


function disableButtons(row) {
  row.components.forEach(button => button.setDisabled(true));
  return row;
}