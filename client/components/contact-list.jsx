import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Contacts } from "../../imports/collections/contacts";
import ContactCard from "./contact-card";

const ContactList = () => {
  const contacts = useTracker(() => Contacts.find({}).fetch(), []);
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe("contacts");
    return !handle.ready();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      <div className="contanct-list">
        {contacts.map((contact) => (
          <ContactCard info={contact} key={contact._id} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
