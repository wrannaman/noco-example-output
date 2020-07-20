const {
  JsonSchemaManager,
  JsonSchema7Strategy,
  OpenApi3Strategy
} = require('@alt3/sequelize-to-json-schemas');
const schemaManager = new JsonSchemaManager();
const User = require('./User.js');
const ApiKey = require('./ApiKey.js');
const Email = require('./Email.js');
const Applicant = require('./Applicant.js');
const Company = require('./Company.js');
module.exports = (instance) => {
  const definitions = {};
  const user = User(instance);
  definitions.user = schemaManager.generate(user, new OpenApi3Strategy());
  const apiKey = ApiKey(instance);
  definitions.apiKey = schemaManager.generate(apiKey, new OpenApi3Strategy());
  const email = Email(instance);
  definitions.email = schemaManager.generate(email, new OpenApi3Strategy());
  const applicant = Applicant(instance);
  definitions.applicant = schemaManager.generate(applicant, new OpenApi3Strategy());
  const company = Company(instance);
  definitions.company = schemaManager.generate(company, new OpenApi3Strategy());

  return definitions;
};