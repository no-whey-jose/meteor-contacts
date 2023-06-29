import _ from "lodash";
import { faker } from "@faker-js/faker";
import { Meteor } from "meteor/meteor";
import { Contacts } from "../imports/collections/contacts";

Meteor.startup(() => {
  const numberOfRecords = Contacts.find({}).count();
  if (!numberOfRecords) {
    _.times(5000, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({
        firstName,
        lastName,
      });
      const phone = faker.phone.number();
      const avatar = faker.image.avatarLegacy();

      Contacts.insert({
        name: `${firstName} ${lastName}`,
        email,
        phone,
        avatar,
      });
    });
  }

  Meteor.publish("contacts", () => {
    return Contacts.find({}, { limit: 20 });
  });
});
