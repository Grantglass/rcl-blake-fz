/* @flow */

// React
import React, { Component } from "react";

// semantic ui
import { Button, Checkbox } from "semantic-ui-react";

// Dropdown
import FilterDropdown from "./FilterDropdown";

export default class FZNavigation extends Component {
  state = {
    showDropdown: false,
  };
  constructor(props) {
    super(props);
    this.handleToggleZoneROI = this.handleToggleZoneROI.bind(this);
    this.handleToggleZoomToZones = this.handleToggleZoomToZones.bind(this);
    this.handleGoToPage = this.handleGoToPage.bind(this);
    this.handleLockRotation = this.handleLockRotation.bind(this);
    this.handleToggleTranscriptionMode =
      this.handleToggleTranscriptionMode.bind(this);
  }

  handleToggleZoneROI() {
    let status;
    if (!this.props.showZoneROI) {
      status = true;
    } else {
      status = false;
    }
    this.props.toggleZoneROIAction(status);
  }

  handleToggleZoomToZones() {
    let status;
    if (!this.props.zoomToZones) {
      status = true;
    } else {
      status = false;
    }
    this.props.toggleZoomToZoneAction(status);
  }

  handleDropdownToggle = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  handleGoToPage(pageNo) {
    this.refs.zoneFilterDropdown.clearSelection();
    this.props.setZonesAction({ currentZones: [] });
    this.props.goToPageAction(pageNo);
  }

  handleToggleTranscriptionMode(event, data) {
    this.props.toggleTranscriptionModeAction(data.checked);
  }

  handleLockRotation(event) {
    this.props.toggleLockRotationAction(!this.props.lockRotation);
  }

  render() {
    const {
      currentPage,
      currentPageDisplay,
      maxPages,
      goToPageAction,
      setZonesAction,
      toggleZoneROIAction,
      toggleZoomToZoneAction,
      toggleLockRotationAction,
      zoneOptions,
      showZoneROI,
      zoomToZones,
      lockRotation,
      diplomaticMode,
    } = this.props;
    const { showDropdown } = this.state;
    let controls = [
      {
        className: "fz-main-menu-button",
        displayIcon: "chevron left",
        displayName: "",
        id: "fz-page-left",
        onClick: () => this.handleGoToPage(currentPage - 1),
        disabled: currentPage === 0,
      },
      {
        className: "fz-main-menu-button",
        displayIcon: "chevron right",
        displayName: "",
        id: "fz-page-left",
        onClick: () => this.handleGoToPage(currentPage + 1),
        disabled: currentPage === maxPages - 1,
      },
      {
        className: showZoneROI
          ? "fz-main-menu-button active"
          : "fz-main-menu-button",
        displayIcon: "eye",
        displayName: "Show Zones",
        id: "fz-toggle-zone-roi",
        onClick: () => this.handleToggleZoneROI(),
        disabled: false,
      },
      {
        className: zoomToZones
          ? "fz-main-menu-button active"
          : "fz-main-menu-button",
        displayIcon: "magnify",
        displayName: "Zoom to Zone",
        id: "fz-zoom-to-zone",
        onClick: () => this.handleToggleZoomToZones(),
        disabled: false,
      },
      {
        className: lockRotation
          ? "fz-main-menu-button active"
          : "fz-main-menu-button",
        displayIcon: "lock",
        displayName: "Lock",
        id: "fz-lock-rotation",
        onClick: () => this.handleLockRotation(),
        disabled: false,
      },
      {
        className: showDropdown
          ? "fz-main-menu-button active"
          : "fz-main-menu-button",
        displayIcon: "object group outline",
        displayName: "Select Zones",
        onClick: this.handleDropdownToggle,
        disabled: false,
      },
    ];
    return (
      <div className="fz-main-menu">
        {controls.map((menuItem, index) => (
          <Button
            className={menuItem.className}
            key={index}
            color="grey"
            icon={menuItem.displayIcon}
            onClick={menuItem.onClick}
            content={menuItem.displayName}
            disabled={menuItem.disabled}
          />
        ))}
        <Button
          className="fz-main-menu-button"
          key={"current_page"}
          content={"Page " + currentPageDisplay + " of " + maxPages}
          disabled={true}
        />
        <FilterDropdown
          className="fz-zone-select-dropdown"
          placeholderText="Zones"
          options={zoneOptions}
          filterKey="currentZones"
          ref="zoneFilterDropdown"
          updateFilterParams={setZonesAction}
          show={showDropdown}
        />
        <Checkbox
          className="fz-toggle-transcription-mode-button"
          checked={diplomaticMode}
          label="Diplomatic Transcription"
          onChange={this.handleToggleTranscriptionMode}
        />
      </div>
    );
  }
}
