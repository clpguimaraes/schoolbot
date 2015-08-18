FactoryGirl.define do
  factory :bus do
    district
    sequence(:identifier) { |n| "TEST-BUS-#{n}" }
  end

  factory :bus_assignment do
    bus
    student
  end

  factory :bus_location do
    bus
    sequence(:latitude) { |n| 42 + (n * 0.001) }
    sequence(:longitude) { |n| -71 + (n * 0.001) }
    heading { %w(North South East West).sample }
    recorded_at { Time.zone.now }
  end

  factory :district do
    sequence(:name) { |n| "Test District #{n}" }
    sequence(:slug) { |n| "district#{n}" }
    sequence(:contact_phone) { |n| "555-000#{n}" }
    sequence(:contact_email) { |n| "contact@district#{n}.example.org" }
    sequence(:zonar_customer) { |n| "abc000#{n}" }
    zonar_username "TestUsername"
    zonar_password "TestPassword"
  end

  factory :school do
    district
    sequence(:name) { |n| "Test School #{n}" }
    sequence(:address) { |n| "#{n} School St, Anytown, USA" }
  end

  factory :student do
    district
    sequence(:digest) { |n| "student-digest-#{n}" }

    transient do
      current_bus nil
    end

    after(:create) do |student, evaluator|
      if evaluator.current_bus.present?
        student.bus_assignments.create!(bus: evaluator.current_bus)
      end
    end
  end

  factory :student_label do
    school
    student
    user
    sequence(:nickname) { |n| "Nickname #{n}" }
  end

  factory :user do
    district
    sequence(:name) { |n| "Test User #{n}" }
    sequence(:email) { |n| "user#{n}@example.org" }
    password "TestPassword"
    sequence(:street) { |n| "#{n} Guardian St" }
    city "Anytown"
    state "USA"
    zip_code "12345"
  end
end
