import React, { Component } from "react";
import DictEquip, { arrayEquip } from "./DictEquip";

export default class Calc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMission: "",
      selectEquip: "",
      mission: {
        title: "",
        missionMass: 0,
        missionCost: 0,
        totalEquips: [],
        stage: [
          {
            id: 0,
            destination: "",
            origin: "",
            difficulty: 0,
            time: 0,
            payloadMass: 0,
            viewPayload: false,
            equipForStageMass: 0,
            separateMass: 0,
            joinMass: 0,
            totalThrust: 0,
            totalImpulse: 0,
            stagePass: false,
            payload: [],
            equipForStage: [],
            join: [],
            separate: [],
          },
        ],
      },
    };

    this.addStage = this.addStage.bind(this);
    this.deleteStage = this.deleteStage.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
    this.onEquipSelect = this.onEquipSelect.bind(this);
    this.addSelectedEquip = this.addSelectedEquip.bind(this);
    this.addJoin = this.addJoin.bind(this);
    this.addSeparate = this.addSeparate.bind(this);
    this.updateMass = this.updateMass.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onJoinQuantityChange = this.onJoinQuantityChange.bind(this);
    this.onSeparateQuantityChange = this.onSeparateQuantityChange.bind(this);
    this.onRemoveEquip = this.onRemoveEquip.bind(this);
    this.onRemoveJoin = this.onRemoveJoin.bind(this);
    this.onRemoveSeparate = this.onRemoveSeparate.bind(this);
    this.onMissionTitleChange = this.onMissionTitleChange.bind(this);
    this.onMissionSelection = this.onMissionSelection.bind(this);
    this.onNewMission = this.onNewMission.bind(this);
    this.onDeleteMission = this.onDeleteMission.bind(this);
    this.onLoadMission = this.onLoadMission.bind(this);
    this.onSaveMission = this.onSaveMission.bind(this);
    this.totalEquipMass = this.totalEquipMass.bind(this);
    this.equipReduce = this.equipReduce.bind(this);
    this.equipAdd = this.equipAdd.bind(this);
    this.payloadToggle = this.payloadToggle.bind(this);
  }

  addStage = () => {
    const newStage = this.state.mission.stage.length;
    let statestage = this.state.mission.stage;
    let destination = statestage[statestage.length - 1].origin;
    statestage.push({
      id: newStage,
      destination: destination,
      origin: "",
      difficulty: 0,
      time: 0,
      payloadMass: 0,
      viewPayload: false,
      equipForStageMass: 0,
      joinMass: 0,
      separateMass: 0,
      totalThrust: 0,
      totalImpulse: 0,
      stagePass: false,
      payload: [],
      equipForStage: [],
      join: [],
      separate: [],
    });
    this.updateMass(statestage);
  };

  onMissionTitleChange = (e) => {
    this.setState({
      mission: {
        ...this.state.mission,
        title: e.target.value,
      },
    });
  };

  onMissionSelection = (e) => {
    this.setState({
      selectedMission: e.target.value,
    });
  };

  onNewMission = (e) => {
    this.setState({
      mission: {
        title: "",
        missionMass: 0,
        missionCost: 0,
        totalEquips: [],
        stage: [
          {
            id: 0,
            destination: "",
            origin: "",
            difficulty: 0,
            time: 0,
            payloadMass: 0,
            viewPayload: false,
            equipForStageMass: 0,
            separateMass: 0,
            joinMass: 0,
            totalThrust: 0,
            totalImpulse: 0,
            stagePass: false,
            payload: [],
            equipForStage: [],
            join: [],
            separate: [],
          },
        ],
      },
    });
  };

  onDeleteMission = (e) => {
    if (localStorage.getItem(this.state.selectedMission) !== null) {
      localStorage.removeItem(this.state.selectedMission);
      this.forceUpdate();
    }
  };

  onLoadMission = (e) => {
    if (localStorage.getItem(this.state.selectedMission) !== null) {
      const loadMission = JSON.parse(
        localStorage.getItem(this.state.selectedMission)
      );
      this.setState({
        mission: loadMission,
      });
    }
  };

  onSaveMission = (e) => {
    if (this.state.mission.title !== "") {
      localStorage.setItem(
        String(this.state.mission.title),
        JSON.stringify(this.state.mission)
      );
    }
    this.forceUpdate();
  };

  deleteStage = () => {
    let newState = this.state;
    if (newState.mission.stage.length > 1) {
      newState.mission.stage.pop();
      this.setState(newState);
    }
  };

  payloadToggle = (stage, value) => {
    let newState = this.state;
    newState.mission.stage[stage].viewPayload = !value;
    this.setState({ newState });
  };

  onTextChange = (e) => {
    const sta = e.target.formTarget;
    const nam = e.target.name;
    const val = e.target.value;
    const statestage = this.state.mission.stage;
    statestage[sta][nam] = val;
    this.setState({
      mission: {
        ...this.state.mission,
        stage: statestage,
      },
    });
  };

  onNumberChange = (e) => {
    const sta = e.target.formTarget;
    const nam = e.target.name;
    const val = e.target.value;
    const statestage = this.state.mission.stage;
    if (!isNaN(val)) {
      statestage[sta][nam] = [val];
      this.updateMass(statestage);
    }
  };

  onQuantityChange = (e) => {
    const sta = e.target.formTarget;
    const nam = e.target.name;
    const val = e.target.value;
    const statestage = this.state.mission.stage;
    if (!isNaN(val)) {
      statestage[sta].equipForStage.forEach((item) => {
        if (item.id === nam) {
          item.quantity = +val;
        }
      });
      this.updateMass(statestage);
    }
  };
  onJoinQuantityChange = (e) => {
    const sta = e.target.formTarget;
    const nam = e.target.name;
    const val = e.target.value;
    const statestage = this.state.mission.stage;
    if (!isNaN(val)) {
      statestage[sta].join.forEach((item) => {
        if (item.id === nam) {
          item.quantity = val;
        }
      });
      this.updateMass(statestage);
    }
  };
  onSeparateQuantityChange = (e) => {
    const sta = e.target.formTarget;
    const nam = e.target.name;
    const val = e.target.value;
    const statestage = this.state.mission.stage;
    if (!isNaN(val)) {
      statestage[sta].separate.forEach((item) => {
        if (item.id === nam) {
          item.quantity = val;
        }
      });
      this.updateMass(statestage);
    }
  };

  onEquipSelect(id) {
    this.setState({ selectEquip: id });
  }

  addSelectedEquip(stageID) {
    if (stageID !== "" && this.state.selectEquip !== "") {
      const equip = DictEquip[this.state.selectEquip].name;
      const statestage = this.state.mission.stage;
      const trim = statestage[stageID].equipForStage.filter(
        (item) => item.id === equip
      );
      if (trim.length === 0) {
        statestage[stageID].equipForStage.push({ id: equip, quantity: 1 });
        this.updateMass(statestage);
      }
    }
  }

  addJoin(stageID) {
    if (stageID !== "" && this.state.selectEquip !== "") {
      const equip = DictEquip[this.state.selectEquip].name;
      const statestage = this.state.mission.stage;
      const trim = statestage[stageID].join.filter((item) => item.id === equip);
      if (trim.length === 0) {
        statestage[stageID].join.push({ id: equip, quantity: 1 });
        this.updateMass(statestage);
      }
    }
  }

  addSeparate(stageID) {
    if (stageID !== "" && this.state.selectEquip !== "") {
      const equip = DictEquip[this.state.selectEquip].name;
      const statestage = this.state.mission.stage;
      const trim = statestage[stageID].separate.filter(
        (item) => item.id === equip
      );
      if (trim.length === 0) {
        statestage[stageID].separate.push({ id: equip, quantity: 1 });
        this.updateMass(statestage);
      }
    }
  }

  onRemoveEquip(stageID, itemID) {
    if (stageID !== "") {
      let statestage = this.state.mission.stage;
      statestage[stageID].equipForStage = statestage[
        stageID
      ].equipForStage.filter((item) => item.id !== itemID);
      this.updateMass(statestage);
    }
  }

  onRemoveJoin(stageID, itemID) {
    if (stageID !== "") {
      let statestage = this.state.mission.stage;
      statestage[stageID].join = statestage[stageID].join.filter(
        (item) => item.id !== itemID
      );
      this.updateMass(statestage);
    }
  }

  onRemoveSeparate(stageID, itemID) {
    if (stageID !== "") {
      let statestage = this.state.mission.stage;
      statestage[stageID].separate = statestage[stageID].separate.filter(
        (item) => item.id !== itemID
      );
      this.updateMass(statestage);
    }
  }

  totalEquipMass(equips) {
    return equips
      .map((item) => {
        if (DictEquip[item.id].mass) {
          return DictEquip[item.id].mass * +item.quantity;
        }
        return 0;
      })
      .reduce((x, y) => x + y);
  }

  equipReduce(equipList, runningTotalEquips) {
    equipList.forEach((item) => {
      let id = item.id;
      let quantity = item.quantity;
      for (let i = runningTotalEquips.length - 1; i >= 0; i--) {
        if (runningTotalEquips[i].id === id) {
          runningTotalEquips[i].quantity -= +quantity;
          if (runningTotalEquips[i].quantity <= 0) {
            runningTotalEquips.splice(i, 1);
          }
        }
      }
    });
    return runningTotalEquips;
  }

  equipAdd(equipList, runningTotalEquips) {
    equipList.forEach((item) => {
      let id = item.id;
      let quantity = item.quantity;
      let adjusted = false;
      runningTotalEquips.forEach((item) => {
        if (item.id === id) {
          item.quantity += +quantity;
          adjusted = true;
        }
      });
      if (!adjusted) {
        runningTotalEquips.push({ id, quantity });
      }
    });
    return runningTotalEquips;
  }

  updateMass(statestage) {
    let runningTotalEquips = [];
    let missionTotalMass = 0;
    let missionTotalCost = 0;
    statestage.forEach((item) => {
      item.totalThrust = 0;
      item.totalImpulse = 0;
      let capacity = 0;
      let astronaut = 0;
      let supplies = 0;
      item.payload = JSON.parse(JSON.stringify(runningTotalEquips));
      if (item.payload.length > 0) {
        item.payloadMass = this.totalEquipMass(item.payload);
        item.payload.forEach((equip) => {
          if (DictEquip[equip.id].impulse) {
            item.totalImpulse += DictEquip[equip.id].impulse * equip.quantity;
          }
          if (DictEquip[equip.id].capacity) {
            capacity += DictEquip[equip.id].capacity;
          }
          if (DictEquip[equip.id].type === "Astronaut") {
            astronaut++;
          }
          if (DictEquip[equip.id].type === "Supplies") {
            supplies++;
          }
        });
      } else {
        item.payloadMass = 0;
      }
      if (item.separate.length > 0) {
        item.separateMass = this.totalEquipMass(item.separate);
        runningTotalEquips = this.equipAdd(item.separate, runningTotalEquips);
      } else {
        item.separateMass = 0;
      }
      if (item.equipForStage.length > 0) {
        item.equipForStageMass = this.totalEquipMass(item.equipForStage);
        runningTotalEquips = this.equipAdd(
          item.equipForStage,
          runningTotalEquips
        );
        item.equipForStage.forEach((equip) => {
          if (DictEquip[equip.id].impulse) {
            item.totalImpulse += DictEquip[equip.id].impulse * equip.quantity;
          }
          if (DictEquip[equip.id].thrust) {
            item.totalThrust += DictEquip[equip.id].thrust * equip.quantity;
          }
          if (DictEquip[equip.id].capacity) {
            capacity += DictEquip[equip.id].capacity;
          }
          if (DictEquip[equip.id].type === "Astronaut") {
            astronaut++;
          }
          if (DictEquip[equip.id].type === "Supplies") {
            supplies++;
          }
        });
      } else {
        item.equipForStageMass = 0;
      }
      if (item.join.length > 0) {
        item.joinMass = this.totalEquipMass(item.join);
        runningTotalEquips = this.equipReduce(item.join, runningTotalEquips);
      } else {
        item.joinMass = 0;
      }
      item.stagePass =
        item.totalThrust + item.totalImpulse * item.time >=
          (item.payloadMass + item.equipForStageMass) * item.difficulty &&
        astronaut <= capacity &&
        supplies >= ((astronaut * item.time) / 5).toFixed(4);
    });
    if (runningTotalEquips.length > 0) {
      missionTotalMass = this.totalEquipMass(runningTotalEquips);
      missionTotalCost = runningTotalEquips
        .map((item) => {
          if (DictEquip[item.id].cost) {
            return DictEquip[item.id].cost * item.quantity;
          }
          return 0;
        })
        .reduce((x, y) => x + y);
    }
    this.setState({
      mission: {
        ...this.state.mission,
        missionMass: missionTotalMass,
        missionCost: missionTotalCost,
        totalEquips: JSON.parse(JSON.stringify(runningTotalEquips)),
        stage: statestage,
      },
    });
  }

  render() {
    const stagemap = this.state.mission.stage;
    const missionEquips = this.state.mission.totalEquips;
    return (
      <div className="calc">
        <form className="mission_details">
          <div
            className="mission_details__new save_load_options"
            onClick={this.onNewMission}
          >
            NEW
          </div>
          <input
            type="text"
            onChange={this.onMissionTitleChange}
            value={this.state.mission.title}
            className="mission_details__title save_load_options"
          />
          <div
            className="mission_details__save save_load_options"
            onClick={this.onSaveMission}
          >
            SAVE
          </div>
        </form>
        <form className="mission_loader">
          <div
            className="mission_loader__load_button save_load_options"
            onClick={this.onLoadMission}
          >
            LOAD
          </div>
          <select
            className="mission_loader__load_select save_load_options"
            value={this.state.selectedMission}
            onChange={this.onMissionSelection}
          >
            <option key="">Load Mission</option>
            {Object.keys(localStorage).map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <div
            className="mission_loader__delete_button save_load_options"
            onClick={this.onDeleteMission}
          >
            DELETE
          </div>
        </form>
        <div className="stage">
          {stagemap.map((item) => {
            const stageID = item.id;
            return (
              <form className="stage__form" key={item.id}>
                <div className="stage__info">
                  <div className="stage__id">Stage: {item.id}</div>
                  <div className="stage__pass">
                    Pass: {item.stagePass ? "Check!" : "Failed"}
                  </div>
                  <div className="stage__disparity">
                    Remaining:{" "}
                    {Math.floor(
                      (item.totalThrust +
                        item.totalImpulse * item.time -
                        (item.payloadMass + item.equipForStageMass) *
                          item.difficulty) /
                        item.difficulty
                    )}
                  </div>
                </div>
                <div className="stage__inputs">
                  <div className="stage__at">At:</div>
                  <input
                    className="stage__at__input"
                    type="text"
                    name="origin"
                    formTarget={item.id}
                    value={item.origin}
                    onChange={this.onTextChange}
                  />
                  <div className="stage__difficuluty">Difficulty:</div>
                  <input
                    className="stage__difficulty__input"
                    type="text"
                    name="difficulty"
                    formTarget={item.id}
                    value={item.difficulty}
                    onChange={this.onNumberChange}
                  />
                  <div className="stage__to">To:</div>
                  <input
                    className="stage__to__input"
                    type="text"
                    name="destination"
                    formTarget={item.id}
                    value={item.destination}
                    onChange={this.onTextChange}
                  />
                  <div className="stage__time">Time:</div>
                  <input
                    className="stage__time__input"
                    type="text"
                    name="time"
                    formTarget={item.id}
                    value={item.time}
                    onChange={this.onNumberChange}
                  />
                </div>
                <div className="stage__total">
                  <div className="stage__total__thrust">
                    Thrust: {item.totalThrust}
                  </div>
                  <div className="stage__total__impulse">
                    Impulse: {item.totalImpulse}
                  </div>
                  <div className="stage__total__mass">
                    Mass: {item.payloadMass + item.equipForStageMass}
                  </div>
                </div>
                {/* <div className="stage__weights">
                  <div className="stage__payload">
                    Payload: {item.payloadMass}
                  </div>
                  <div className="stage__mass">
                    Equip for Stage: {item.equipForStageMass}
                  </div>
                  <div className="stage__totalmass">
                    Total Mass: {item.totalMass}
                  </div>
                </div> */}
                <div className="payload">
                  Payload: {item.payloadMass}{" "}
                  <span
                    className="payload__toggle"
                    onClick={() =>
                      this.payloadToggle(stageID, item.viewPayload)
                    }
                  >
                    {item.viewPayload ? " -- " : " ++ "}
                  </span>
                </div>
                {!item.viewPayload ? null : (
                  <div className="view__payload">
                    {item.payload.map((item) => {
                      const comp = DictEquip[item.id];
                      return (
                        <div className="equip" key={item.id}>
                          <div className="equip__delete_and_quantity">
                            {item.quantity}
                          </div>
                          <div className="equip__name">{item.id}</div>
                          {comp.mass ? (
                            <div className="equip__mass">{comp.mass}</div>
                          ) : (
                            <div className="equip__mass">0</div>
                          )}
                          {comp.mass ? (
                            <div className="equip__total">
                              {comp.mass * item.quantity}
                            </div>
                          ) : (
                            <div className="equip__total">0</div>
                          )}
                          {comp.specialty ? (
                            <div className="equip__specialty">
                              {comp.specialty}
                            </div>
                          ) : null}
                          <div className="equip__mass_subtotal"></div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="stage__equipment">
                  <div className="equipment__quantity">Quantity:</div>
                  <div className="equipment__name">Component:</div>
                  <div className="equipment__mass">Mass:</div>
                  <div className="equipment__total">Total:</div>
                  <div className="equipment__special">Special:</div>
                  {item.equipForStage.map((item) => {
                    const comp = DictEquip[item.id];
                    return (
                      <div className="equip" key={item.id}>
                        <div className="equip__delete_and_quantity">
                          <span
                            className="equip_remove_button"
                            onClick={() => this.onRemoveEquip(stageID, item.id)}
                          >
                            X
                          </span>
                          <input
                            className="equip__quantity"
                            type="text"
                            name={item.id}
                            formTarget={stageID}
                            value={item.quantity}
                            onChange={this.onQuantityChange}
                          />
                        </div>
                        <div className="equip__name">{item.id}</div>
                        {comp.mass ? (
                          <div className="equip__mass">{comp.mass}</div>
                        ) : (
                          <div className="equip__mass">0</div>
                        )}
                        {comp.mass ? (
                          <div className="equip__total">
                            {comp.mass * item.quantity}
                          </div>
                        ) : (
                          <div className="equip__total">0</div>
                        )}
                        {comp.thrust ? (
                          <div className="equip__thrust">
                            Thrust: {comp.thrust * item.quantity}
                          </div>
                        ) : null}
                        {comp.specialty ? (
                          <div className="equip__specialty">
                            {comp.specialty}
                          </div>
                        ) : null}
                        <div className="equip__mass_subtotal"></div>
                      </div>
                    );
                  })}

                  {item.join.length === 0
                    ? null
                    : item.join.map((item) => {
                        const comp = DictEquip[item.id];
                        return (
                          <div className="equip" key={item.id}>
                            <div className="equip__delete_and_quantity">
                              <span
                                className="equip_remove_button"
                                onClick={() =>
                                  this.onRemoveJoin(stageID, item.id)
                                }
                              >
                                X
                              </span>
                              <input
                                className="equip__quantity"
                                type="text"
                                name={item.id}
                                formTarget={stageID}
                                value={item.quantity}
                                onChange={this.onJoinQuantityChange}
                              />
                            </div>
                            <div className="equip__name">Join - {item.id}</div>
                            {comp.mass ? (
                              <div className="equip__mass">{comp.mass}</div>
                            ) : (
                              <div className="equip__mass">0</div>
                            )}
                            {comp.mass ? (
                              <div className="equip__total">
                                {comp.mass * item.quantity}
                              </div>
                            ) : (
                              <div className="equip__total">0</div>
                            )}
                            <div className="equip__special">
                              {comp.thrust ? (
                                <span className="equip__thrust">
                                  Thrust: {comp.thrust * item.quantity}
                                </span>
                              ) : null}
                              {comp.specialty ? (
                                <span className="equip__specialty">
                                  {comp.specialty}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                  {item.separate.length === 0
                    ? null
                    : item.separate.map((item) => {
                        const comp = DictEquip[item.id];
                        return (
                          <div className="equip" key={item.id}>
                            <div className="equip__delete_and_quantity">
                              <span
                                className="equip_remove_button"
                                onClick={() =>
                                  this.onRemoveSeparate(stageID, item.id)
                                }
                              >
                                X
                              </span>
                              <input
                                className="equip__quantity"
                                type="text"
                                name={item.id}
                                formTarget={stageID}
                                value={item.quantity}
                                onChange={this.onSeparateQuantityChange}
                              />
                            </div>
                            <div className="equip__name">
                              Separate - {item.id}
                            </div>
                            {comp.mass ? (
                              <div className="equip__mass">{comp.mass}</div>
                            ) : (
                              <div className="equip__mass">0</div>
                            )}
                            {comp.mass ? (
                              <div className="equip__total">
                                {comp.mass * item.quantity}
                              </div>
                            ) : (
                              <div className="equip__total">0</div>
                            )}
                            <div className="equip__special">
                              {comp.thrust ? (
                                <span className="equip__thrust">
                                  Thrust: {comp.thrust * item.quantity}
                                </span>
                              ) : null}
                              {comp.specialty ? (
                                <span className="equip__specialty">
                                  {comp.specialty}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                </div>
                <div className="stage__add_buttons">
                  <div
                    className="stage__join"
                    onClick={() => this.addJoin(item.id)}
                  >
                    Add Join
                  </div>
                  <div
                    className="stage__separate"
                    onClick={() => this.addSeparate(item.id)}
                  >
                    Add Separate
                  </div>
                  <div
                    className="stage__addEquip"
                    onClick={() => this.addSelectedEquip(item.id)}
                  >
                    Add Component
                  </div>
                </div>
                <div className="stage__add_equip_notes">
                  Joined equipment must still be listed where required.
                </div>
              </form>
            );
          })}
          <div className="stage__delete_stage" onClick={this.deleteStage}>
            Delete Stage
          </div>
          <div className="stage__add_stage" onClick={this.addStage}>
            Add Stage
          </div>
          <div className="missiontotal_wrapper">
            <div className="mission__totals">
              <div className="mission__total__title">Mission Totals:</div>
              <div className="mission__total__cost">
                Total Cost: {this.state.mission.missionCost}
              </div>
              <div className="mission__total__mass">
                Total Mass: {this.state.mission.missionMass}
              </div>
            </div>
            <div className="mission__headers">
              <div className="mission__headers__quantity">Quantity:</div>
              <div className="mission__headers__name">Component:</div>
              <div className="mission__headers__mass">Mass:</div>
              <div className="mission__headers__cost">Cost:</div>
            </div>
            {missionEquips.length === 0
              ? null
              : missionEquips.map((item) => {
                  return (
                    <div className="mission__equip__li" key={item.id}>
                      <div className="equip__li__quantity">{item.quantity}</div>
                      <div className="equip__li__name">{item.id}</div>
                      <div className="equip__li__mass">
                        {DictEquip[item.id].mass
                          ? DictEquip[item.id].mass * item.quantity
                          : 0}
                      </div>
                      <div className="equip__li__cost">
                        {DictEquip[item.id].cost
                          ? DictEquip[item.id].cost * item.quantity
                          : 0}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="equiplist_wrapper">
          <div className="equiplist__headers">
            <div className="headers__name">Component:</div>
            <div className="headers__type">Type:</div>
            <div className="headers__requirement">Requirement:</div>
            <div className="headers__special">Special:</div>
          </div>
          {arrayEquip.map((item) => {
            return (
              <div
                className="equiplist"
                onClick={() => this.onEquipSelect(item.name)}
                key={item.name}
              >
                <div className="equiplist__name">{item.name}</div>
                <div className="equiplist__type">{item.type}</div>
                <div className="equiplist__require">{item.requires}</div>
                {item.type === "Astronaut" ? (
                  <div className="equiplist__specialty">{item.specialty}</div>
                ) : null}
                {item.type === "Rocket" ? (
                  <div className="equiplist__thrust">Thrust: {item.thrust}</div>
                ) : null}
                {item.type === "Capsule" ? (
                  <div className="equiplist__capacity">
                    Capacity: {item.capacity}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
