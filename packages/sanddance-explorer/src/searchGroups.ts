/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { SandDance } from '@msrvida/sanddance-react';
import { InputSearchExpression } from './controls/searchTerm';
import { InputSearchExpressionGroup } from './dialogs/search';

import SearchExpressionGroup = SandDance.searchExpression.SearchExpressionGroup;

function comparableGroup(group: SearchExpressionGroup): SearchExpressionGroup {
    return { ...group, clause: null };
}

function compareGroup(a: SearchExpressionGroup, b: SearchExpressionGroup) {
    return SandDance.searchExpression.compareGroup(comparableGroup(a), comparableGroup(b));
}

export function compareGroups(haystack: SearchExpressionGroup[], needle: SearchExpressionGroup) {
    const groups: SearchExpressionGroup[] = [];
    let found = false;

    //look for item in all
    haystack.forEach(group => {
        if (compareGroup(group, needle)) {
            //if it exists, don't add it
            found = true;
        } else {
            groups.push(group);
        }
    });

    return { groups, found };
}

export function createInputSearch(search: SandDance.searchExpression.Search) {
    const groups = SandDance.searchExpression.ensureSearchExpressionGroupArray(search);
    const dialogSearch: InputSearchExpressionGroup[] = groups.map((group, groupIndex) => {
        return {
            key: groupIndex,
            ...group,
            expressions: group.expressions.map((ex, i) => {
                const ex2: InputSearchExpression = {
                    key: i,
                    ...ex,
                };
                return ex2;
            }),
        };
    });
    return dialogSearch;
}