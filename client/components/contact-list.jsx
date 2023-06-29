import React, { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Contacts } from "../../imports/collections/contacts";
import ContactCard from "./contact-card";

const PER_PAGE = 20;

const ContactList = () => {
  const [numberLoaded, setNumberLoaded] = useState(PER_PAGE);
  const contacts = useTracker(() => Contacts.find({}).fetch(), []);
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe("contacts", numberLoaded);
    return !handle.ready();
  }, [numberLoaded]);

  const handleClick = () => {
    setNumberLoaded(numberLoaded + PER_PAGE);
  };

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
      <button className="btn btn-primary" onClick={handleClick}>
        More Contacts
      </button>
    </div>
  );
};

export default ContactList;
