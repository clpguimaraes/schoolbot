import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  districts: Ember.inject.service(),
  districtName: Ember.computed.alias('districts.current.name'),
  schools: Ember.computed.alias('districts.current.schools'),

  registration: null,
  setup: Ember.on('init', function() {
    this.set('registration', this.get('store').createRecord('registration'));
  }),

  actions: {
    updateStudent(attributes) {
      this.get('registration').setProperties(attributes);
    },

    register() {
      this.get('registration').save().then(() => {
        this.get('session').authenticate(
          'authenticator:token',
          this.get('registration.email'),
          this.get('registration.password')
        );
      }).catch((error) => {
        if (this.get('registration.isValid')) {
          Ember.onerror(error);
        }
      });
    }
  }
});
