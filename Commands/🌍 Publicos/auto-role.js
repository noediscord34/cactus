////////////////////////////////esto lo aÃ±aden como comando, en su debida carpeta.////////////////////////////////

const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ChannelType,
    ActionRowBuilder,
    SelectMenuBuilder,
    StringSelectMenuBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("roleauto")
      .setDescription("Para Poner los roles a los usuarios (SOLO SOPORTE)")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("CUSTOMID1")
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder("Selecciona")
          .addOptions([
            {
              label: "Este es la seleccionar el rol +18",
              description: "Se ha dado el rol con exito!",
              value: "first_option",
            },
            {
              label: "Este es la seleccionar el rol -18",
              description: "Se ha dado el rol con exito!",
              value: "second_option",
            },
          ])
      );
  
      const menuEmbed = new EmbedBuilder()
        .setDescription(`¡Bienvenido a nuestros autorroles de edad! Aquí puedes seleccionar el rango de edad que mejor te representa. Estos roles nos ayudan a mantener un ambiente seguro y adecuado para todos en el servidor.

        Selecciona uno de los siguientes roles para identificar tu grupo de edad y disfrutar de contenido adaptado a tu experiencia:
        
        - 👶 **Menores de 18**: Para nuestros miembros más jóvenes.
        - 🧑 **18 a 24 años**: ¡Jóvenes adultos listos para la diversión!`)
        .setColor(0x9b59b6)
        .setImage(
          "https://i.pinimg.com/236x/8f/2d/6c/8f2d6c21a6d012e3a059da279bf3e1c2.jpg"
        );

        interaction.channel.send({ embeds: [menuEmbed], components: [row] })
        .then(() => {
          interaction.reply({ content: `.`, ephemeral: true });
          interaction.deleteReply();
        })
        .catch((error) => {
          console.error("Error al enviar el mensaje:", error);
        });
      
    },
  };
  
  