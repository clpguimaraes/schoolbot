import Ember from 'ember';
import ApplicationRouteMixin from
  'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  districts: Ember.inject.service(),
  i18n: Ember.inject.service(),
  moment: Ember.inject.service(),
  onError: Ember.inject.service(),
  sessionStorage: Ember.inject.service(),
  translations: Ember.inject.service(),

  beforeModel() {
    this.get('onError').setup();

    const storedLocale = this.get('sessionStorage.locale');
    if (Ember.isPresent(storedLocale)) {
      this.get('moment').changeLocale(storedLocale);
      this.get('i18n').set('locale', storedLocale);
    }

    return this.get('districts').setup().then((district) => {
      if (district) { return this.get('translations').setup(); }
    });
  }
});
