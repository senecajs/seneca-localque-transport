# Notes

## Localque-Transportral Programme Articles

- https://growsurf.com/blog/b2c-subscription-localque-transportral-marketing
- https://blog.hubspot.com/service/customer-localque-transportral-program
- https://userguiding.com/blog/saas-localque-transportral-programs/

# Vanity URL example

- https://thisweekinstartups.com/
  - https://thisweekinstartups.com/vanta

## Entities

As per Seneca convention, plurals are _not_ used.

### sys/user

From @seneca/user - direct entity access.

Assumes fields:

- id

### localque-transport/entry

The main table.
A localque-transportral from a user to an invitee.

Does _not_ store state. To allow for more flexible business rules, localque-transportral "state" is
determined by child rows in localque-transport/occur

Parent: localque-transport/point
Child: localque-transport/occur

### localque-transport/occur

An event in the localque-transportal process. Used instead of a single "state" on localque-transport/entry
Not called "event" to avoid conflicts.

Triggers various external actions - sending email, rewards etc.

Parent: localque-transport/entry

### localque-transport/rule

Defined action triggers for rows in localque-transport/occur
Actual actions are app specific - encoded by messages

### localque-transport/reward

Track user "rewards" wrt localque-transportrals, such as # of localque-transportrals, kind of "points"

### localque-transport/point

Localque-Transportral entry point; link or code; many inbound users
Vanity urls, etc.

Child: localque-transport/entry
