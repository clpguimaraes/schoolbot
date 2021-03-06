import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  bus: DS.belongsTo('bus', { async: false }),
  school: DS.belongsTo('school', { async: false }),

  digest: DS.attr('string'),
  nickname: DS.attr('string'),

  isAssigned: Ember.computed.notEmpty('bus'),
  isLocated: Ember.computed.alias('bus.hasLocations'),

  allStudents: Ember.computed(function() {
    return this.store.peekAll('student');
  }),
  persistedStudents: Ember.computed.filterBy('allStudents', 'isNew', false),

  abbreviation: Ember.computed('persistedStudents.@each.nickname', function() {
    let length = 1;
    for (; length < 3; length++) {
      let abbreviationIsUnique =
        this.get('persistedStudents').without(this).every((student) => {
          let myAbbreviation = this.get('nickname').slice(0, length);
          let otherAbbreviation = student.get('nickname').slice(0, length);
          return myAbbreviation !== otherAbbreviation;
        });

      if (abbreviationIsUnique) {
        break;
      }
    }
    return this.get('nickname').slice(0, length);
  }),

  index: Ember.computed('persistedStudents.@each.nickname', function() {
    return this.get('persistedStudents').sortBy('nickname').indexOf(this);
  })
});
