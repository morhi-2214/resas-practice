import {
  usePopulationRepository,
  PopulationRepository,
} from "./populationRepository";

export type Repositories = {
  population: PopulationRepository;
};

const repositories = {
  population: usePopulationRepository(),
} as Repositories;

export const RepositoryFactory = {
  get: (name: keyof Repositories): Repositories[keyof Repositories] =>
    repositories[name],
};
