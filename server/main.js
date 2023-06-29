import _ from "lodash";
import { faker } from "@faker-js/faker";
import { Meteor } from "meteor/meteor";
import { Contacts } from "../imports/collections/contacts";

Meteor.startup(() => {
  const numberOfRecords = Contacts.find({}).count();
  if (!numberOfRecords) {
    _.times(5000, () => {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const phone = faker.phone.number();

      Contacts.insert({
        name,
        email,
        phone,
        avatar: faker.image.avatar(),
      });
    });
  }

  Meteor.publish("contacts", () => {
    return Contacts.find({}, { limit: 20 });
  });
});
