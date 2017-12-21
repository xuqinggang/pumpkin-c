import React, { Component } from 'react';
import MoneyFilter from 'Shared/MoneyFilter/MoneyFilter';
import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';

export default FilterConfirmConnect()(MoneyFilter);
