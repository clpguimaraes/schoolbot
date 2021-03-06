import Ember from 'ember';
import ResetScrollMixin from './mixins/reset-scroll';
import UnauthenticatedRouteMixin from
  'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(ResetScrollMixin, UnauthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('passwordReset');
  }
});
