/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class ExaltedessenceItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.system;
    const actorData = this.actor ? this.actor.system : {};
  }

  async _preCreate(createData, options, userId) {
    if (createData.type === 'intimacy') {
      this.updateSource({ img: "systems/exaltedessence/assets/icons/hearts.svg" });
    }
    if (createData.type === 'spell') {
      this.updateSource({ img: "systems/exaltedessence/assets/icons/magic-swirl.svg"  });
    }
    if (createData.type === 'ritual') {
      this.updateSource({ img: "icons/svg/book.svg" });
    }
    if (createData.type === 'merit') {
      this.updateSource({ img: "icons/svg/coins.svg" });
    }
    if (createData.type === 'quality') {
      this.updateSource({ img: "icons/svg/aura.svg" });
    }
    if (createData.type === 'weapon') {
      this.updateSource({ img: "icons/svg/sword.svg" });
    }
    if (createData.type === 'armor') {
      this.updateSource({ img: "systems/exaltedessence/assets/icons/breastplate.svg" });
    }
    if (createData.type === 'charm') {
      this.updateSource({ img: "icons/svg/explosion.svg" });
    }
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    // Basic template rendering data
    const token = this.actor.token;
    const item = this;
    const actorData = this.actor ? this.actor.system : {};
    const itemData = item.system;

    // let roll = new Roll('d20+@abilities.str.mod', actorData);
    // let label = `Rolling ${item.name}`;
    // roll.roll().toMessage({
    //   speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    //   flavor: label
    // });
  }
}

export function prepareItemTraits(type, i) {
  const map = {
  };
  if (type === 'weapon') {
    map['weapontags'] = CONFIG.EXALTEDESSENCE.weapontags
  }
  if (type === 'armor') {
    map['armortags'] = CONFIG.EXALTEDESSENCE.armortags
  }
  for (let [t, choices] of Object.entries(map)) {
    const trait = i.system.traits[t];
    if (!trait) continue;
    let values = [];
    if (trait.value) {
      values = trait.value instanceof Array ? trait.value : [trait.value];
    }
    trait.selected = values.reduce((obj, t) => {
      obj[t] = choices[t];
      return obj;
    }, {});

    // Add custom entry
    if (trait.custom) {
      trait.custom.split(";").forEach((c, i) => trait.selected[`custom${i + 1}`] = c.trim());
    }
    trait.cssClass = !isEmpty(trait.selected) ? "" : "inactive";
  }
}
