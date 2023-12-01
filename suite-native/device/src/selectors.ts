import {
    AccountsRootState,
    DeviceRootState,
    DiscoveryRootState,
    selectDeviceFirmwareVersion,
    selectDeviceModel,
    selectIsConnectedDeviceUninitialized,
    selectIsDeviceConnectedAndAuthorized,
    selectIsPortfolioEmpty,
    selectIsUnacquiredDevice,
} from '@suite-common/wallet-core';

import { isFirmwareVersionSupported } from './utils';

export const selectIsFirmwareSupported = (state: DeviceRootState) => {
    const deviceFwVersion = selectDeviceFirmwareVersion(state);
    const deviceModel = selectDeviceModel(state);

    return isFirmwareVersionSupported(deviceFwVersion, deviceModel);
};

export const selectIsDeviceReadyToUse = (
    state: DeviceRootState & AccountsRootState & DiscoveryRootState,
) => {
    const isPortfolioEmpty = selectIsPortfolioEmpty(state);
    const isUnacquiredDevice = selectIsUnacquiredDevice(state);
    const isFirmwareSupported = selectIsFirmwareSupported(state);
    const isDeviceUninitialized = selectIsConnectedDeviceUninitialized(state);

    return (
        !isUnacquiredDevice && !isDeviceUninitialized && isFirmwareSupported && !isPortfolioEmpty
    );
};

export const selectIsDeviceReadyToUseAndAuthorized = (
    state: DeviceRootState & AccountsRootState & DiscoveryRootState,
) => {
    const isDeviceReadyToUse = selectIsDeviceReadyToUse(state);
    const isDeviceConnectedAndAuthorized = selectIsDeviceConnectedAndAuthorized(state);

    return isDeviceReadyToUse && isDeviceConnectedAndAuthorized;
};