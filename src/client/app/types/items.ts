/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ChartTypes } from '../types/redux/graph';
import { LanguageTypes } from '../types/i18n';

/**
 * The type of options displayed in Select components.
 */
export interface SelectOption {
	label: string;
	value: number;
}

/**
 * An item with a name and ID number.
 */
export interface NamedIDItem {
	id: number;
	name: string;
}

/**
 * An item that is the result of a preference request
 */
export interface PreferenceRequestItem {
	displayTitle: string;
	defaultChartToRender: ChartTypes;
	defaultBarStacking: boolean;
	defaultLanguage: LanguageTypes;
}

/**
 * A collection of items giving a label to an item in a dataset, by index
 */
export interface TooltipItems {
	datasetIndex: number;
	yLabel: string;
	[i: number]: {
		xLabel: string;
	};
}

/**
 * A user object to be displayed for Administrators.
 */
export interface User {
	email: string;
	role: string;
}

/**
 * This is a enum that should match User.role on the server side.
 */
export enum UserRole {
	admin = 'ADMIN',
	obvius = 'OBVIUS',
	csv = 'CSV',
};