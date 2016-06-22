import React, { Component } from 'react';
import Building from './comps/Building';

const getBuildingsForRessorce = (buildings, res) => {
  const result = [];
  buildings && buildings.forEach((item) => {
    if (item.produces.indexOf(res) != -1) result.push(item);
  });
  return result;
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buildings: [
        {
          name: 'woodcutter',
          count: 0,
          perSecondperUnit: 1,
          produces: ['wood'],
        }
      ],
      ressources: {
        wood: 0,
      },
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      const buildings = this.state.buildings;
      const ressources = this.state.ressources;
      Object.keys(ressources).forEach((ressource) => {
        const buildingsArray = getBuildingsForRessorce(buildings, ressource);
        let tempRes = ressources[ressource];
        buildingsArray.forEach((building) => {
          tempRes += building.perSecondperUnit * building.count;
        });
        ressources[ressource] = tempRes;
      });
      this.setState({
        buildings,
        ressources,
      });
    }, 1000);
  };

  increaseBuildingCount = (name) => {
    const buildings = this.state.buildings;
    buildings.forEach((item) => {
      if (item.name.indexOf(name) != -1) item.count++;
    });
    this.setState({ buildings });
  };

  render() {
    return (
      <div>
        <h1>Buildings</h1>
        {
          this.state.buildings.map((building) => {
            return (
              <Building
                key={building.name}
                name={building.name}
                count={building.count}
                increase={this.increaseBuildingCount}
              />
            )
          })
        }
        <h1>Ressources</h1>
        {
          Object.keys(this.state.ressources).map((res) => {
            return (
              <div>
                {`${res}: ${this.state.ressources[res]}`}
              </div>
            );
          })
        }
      </div>
    );
  };
}
