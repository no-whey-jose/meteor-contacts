import _ from 'lodash'
import { image, helpers } from '@faker-js/faker'
import Meteor from 'meteor/meteor'
import { Contacts } from '../imports/collections/contacts'

Meteor.startup(() => {
    const numberOfRecords = Contacts.find({}).count()
    if(!numberOfRecords) {
        _.times(5000, () => {
            const { name, email, phone} = helpers.createCard()

            Contacts.insert({
                name,
                email,
                phone,
                avatar: image.avatar()
            })
        })
    }
})