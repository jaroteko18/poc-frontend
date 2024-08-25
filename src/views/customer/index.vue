<template>
    <div class="w-full">
        <data-list class="card" ref="listControl" title="Customer"
        grid-hide-select
        grid-config="/api/customerform/gridconfig" 
        form-config="/api/customerform/formconfig" 
        grid-read="/api/customerform/gets"
        form-read="/api/customer/get" 
        grid-mode="grid" 
        grid-delete="/customer/delete" 
        form-keep-label
        form-insert="/customer/insert" 
        form-update="/customer/update" 
        :grid-fields="['Enable']"
        :init-app-mode="data.appMode" 
        :init-form-mode="data.formMode" 
        @formNewData="newRecord" 
        @formEditData="openForm">
      </data-list>
    </div>
</template>

<script setup>
import { layoutStore } from '@/stores/layout';
import { authStore } from '@/stores/auth';
import { reactive, ref, onMounted, inject } from "vue";
import { DataList, util } from "suimjs";
  
const layout = layoutStore();
const auth = authStore();
layout.change('evs');

const axios = inject('axios');

const data = reactive({
    appMode: "grid",
    formMode: "edit",
    gridCfg:{
    "setting": {
        "idField": "id",
        "keywordFields": [
            "id",
            "Name"
        ],
        "sortable": [
            "id"
        ]
    },
    "fields": [
        {
            "field": "id",
            "kind": "text",
            "label": "ID",
            "halign": "start",
            "valign": "start",
            "labelField": "",
            "length": 0,
            "width": "",
            "pos": 1000,
            "readType": "show",
            "decimal": 0,
            "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
            "unit": "",
            "input": {
                "field": "id",
                "label": "ID",
                "hint": "",
                "hide": false,
                "placeHolder": "ID",
                "kind": "text",
                "disable": false,
                "required": false,
                "multiple": false,
                "multiRow": 1,
                "minLength": 0,
                "maxLength": 999,
                "readOnly": false,
                "readOnlyOnEdit": true,
                "readOnlyOnNew": false,
                "useList": false,
                "allowAdd": false,
                "items": [],
                "useLookup": false,
                "lookupUrl": "",
                "lookupKey": "",
                "lookupLabels": null,
                "lookupSearchs": null,
                "lookupFormat1": "",
                "lookupFormat2": "",
                "showTitle": false,
                "showHint": false,
                "showDetail": false,
                "fixTitle": false,
                "fixDetail": false,
                "section": "General",
                "sectionWidth": "",
                "row": 0,
                "col": 0,
                "labelField": "",
                "decimal": 0,
                "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
                "unit": "",
                "width": "",
                "spaceBefore": 0,
                "spaceAfter": 0
            }
        },
        {
            "field": "name",
            "kind": "text",
            "label": "Name",
            "halign": "start",
            "valign": "start",
            "labelField": "",
            "length": 0,
            "width": "",
            "pos": 1000,
            "readType": "show",
            "decimal": 0,
            "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
            "unit": "",
            "input": {
                "field": "name",
                "label": "Name",
                "hint": "",
                "hide": false,
                "placeHolder": "Name",
                "kind": "text",
                "disable": false,
                "required": true,
                "multiple": false,
                "multiRow": 1,
                "minLength": 0,
                "maxLength": 999,
                "readOnly": false,
                "readOnlyOnEdit": false,
                "readOnlyOnNew": false,
                "useList": false,
                "allowAdd": false,
                "items": [],
                "useLookup": false,
                "lookupUrl": "",
                "lookupKey": "",
                "lookupLabels": null,
                "lookupSearchs": null,
                "lookupFormat1": "",
                "lookupFormat2": "",
                "showTitle": false,
                "showHint": false,
                "showDetail": false,
                "fixTitle": false,
                "fixDetail": false,
                "section": "General",
                "sectionWidth": "",
                "row": 0,
                "col": 0,
                "labelField": "",
                "decimal": 0,
                "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
                "unit": "",
                "width": "",
                "spaceBefore": 0,
                "spaceAfter": 0
            }
        },
        {
            "field": "email",
            "kind": "text",
            "label": "Email",
            "halign": "start",
            "valign": "start",
            "labelField": "",
            "length": 0,
            "width": "",
            "pos": 1000,
            "readType": "show",
            "decimal": 0,
            "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
            "unit": "",
            "input": {
                "field": "email",
                "label": "Email",
                "hint": "",
                "hide": false,
                "placeHolder": "Email",
                "kind": "text",
                "disable": false,
                "required": false,
                "multiple": false,
                "multiRow": 1,
                "minLength": 0,
                "maxLength": 999,
                "readOnly": false,
                "readOnlyOnEdit": false,
                "readOnlyOnNew": false,
                "useList": true,
                "allowAdd": false,
                "items": [
                    {
                        "key": "Customer Sales",
                        "text": "Customer Sales"
                    },
                    {
                        "key": "Credit Note",
                        "text": "Credit Note"
                    },
                    {
                        "key": "Mining Invoice - Rent",
                        "text": "Mining Invoice - Rent"
                    },
                    {
                        "key": "Mining Invoice - Overtime Driver",
                        "text": "Mining Invoice - Overtime Driver"
                    },
                    {
                        "key": "General Invoice",
                        "text": "General Invoice"
                    }
                ],
                "useLookup": false,
                "lookupUrl": "",
                "lookupKey": "",
                "lookupLabels": null,
                "lookupSearchs": null,
                "lookupFormat1": "",
                "lookupFormat2": "",
                "showTitle": false,
                "showHint": false,
                "showDetail": false,
                "fixTitle": false,
                "fixDetail": false,
                "section": "General",
                "sectionWidth": "",
                "row": 0,
                "col": 0,
                "labelField": "",
                "decimal": 0,
                "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
                "unit": "",
                "width": "",
                "spaceBefore": 0,
                "spaceAfter": 0
            }
        }
    ]
    },
    formCfg:{
    "setting": {
        "idField": "id",
        "title": "Customer",
        "showTitle": false,
        "initialMode": "edit",
        "hideButtons": false,
        "hideEditButton": false,
        "hideSubmitButton": false,
        "hideCancelButton": false,
        "submitText": "Save",
        "autoCol": 1,
        "sectionDirection": "col",
        "sectionSize": 1
    },
    "sectionGroups": [
        {
            "sections": [
                {
                    "title": "General",
                    "name": "General",
                    "showTitle": false,
                    "rows": [
                        [
                            {
                                "field": "id",
                                "label": "ID",
                                "hint": "",
                                "hide": false,
                                "placeHolder": "ID",
                                "kind": "text",
                                "disable": false,
                                "required": false,
                                "multiple": false,
                                "multiRow": 1,
                                "minLength": 0,
                                "maxLength": 999,
                                "readOnly": false,
                                "readOnlyOnEdit": true,
                                "readOnlyOnNew": false,
                                "useList": false,
                                "allowAdd": false,
                                "items": [],
                                "useLookup": false,
                                "lookupUrl": "",
                                "lookupKey": "",
                                "lookupLabels": null,
                                "lookupSearchs": null,
                                "lookupFormat1": "",
                                "lookupFormat2": "",
                                "showTitle": false,
                                "showHint": false,
                                "showDetail": false,
                                "fixTitle": false,
                                "fixDetail": false,
                                "section": "General",
                                "sectionWidth": "",
                                "row": 1001,
                                "col": 1,
                                "labelField": "",
                                "decimal": 0,
                                "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
                                "unit": "",
                                "width": "",
                                "spaceBefore": 0,
                                "spaceAfter": 0
                            }
                        ],
                        [
                            {
                                "field": "name",
                                "label": "Name",
                                "hint": "",
                                "hide": false,
                                "placeHolder": "Name",
                                "kind": "text",
                                "disable": false,
                                "required": true,
                                "multiple": false,
                                "multiRow": 1,
                                "minLength": 0,
                                "maxLength": 999,
                                "readOnly": false,
                                "readOnlyOnEdit": false,
                                "readOnlyOnNew": false,
                                "useList": false,
                                "allowAdd": false,
                                "items": [],
                                "useLookup": false,
                                "lookupUrl": "",
                                "lookupKey": "",
                                "lookupLabels": null,
                                "lookupSearchs": null,
                                "lookupFormat1": "",
                                "lookupFormat2": "",
                                "showTitle": false,
                                "showHint": false,
                                "showDetail": false,
                                "fixTitle": false,
                                "fixDetail": false,
                                "section": "General",
                                "sectionWidth": "",
                                "row": 1002,
                                "col": 1,
                                "labelField": "",
                                "decimal": 0,
                                "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
                                "unit": "",
                                "width": "",
                                "spaceBefore": 0,
                                "spaceAfter": 0
                            }
                        ],
                        [
                            {
                                "field": "email",
                                "label": "Email",
                                "hint": "",
                                "hide": false,
                                "placeHolder": "Transaction type",
                                "kind": "text",
                                "disable": false,
                                "required": false,
                                "multiple": false,
                                "multiRow": 1,
                                "minLength": 0,
                                "maxLength": 999,
                                "readOnly": false,
                                "readOnlyOnEdit": false,
                                "readOnlyOnNew": false,
                                "useList": true,
                                "allowAdd": false,
                                "items": [
                                    {
                                        "key": "Customer Sales",
                                        "text": "Customer Sales"
                                    },
                                    {
                                        "key": "Credit Note",
                                        "text": "Credit Note"
                                    },
                                    {
                                        "key": "Mining Invoice - Rent",
                                        "text": "Mining Invoice - Rent"
                                    },
                                    {
                                        "key": "Mining Invoice - Overtime Driver",
                                        "text": "Mining Invoice - Overtime Driver"
                                    },
                                    {
                                        "key": "General Invoice",
                                        "text": "General Invoice"
                                    }
                                ],
                                "useLookup": false,
                                "lookupUrl": "",
                                "lookupKey": "",
                                "lookupLabels": null,
                                "lookupSearchs": null,
                                "lookupFormat1": "",
                                "lookupFormat2": "",
                                "showTitle": false,
                                "showHint": false,
                                "showDetail": false,
                                "fixTitle": false,
                                "fixDetail": false,
                                "section": "General",
                                "sectionWidth": "",
                                "row": 1003,
                                "col": 1,
                                "labelField": "",
                                "decimal": 0,
                                "dateFormat": "DD-MMM-YYYY hh:mm:ss Z",
                                "unit": "",
                                "width": "",
                                "spaceBefore": 0,
                                "spaceAfter": 0
                            }
                        ]
                    ],
                    "autoCol": 1,
                    "width": ""
                }
            ]
        }
    ]
    },
    items:{
    "count": 3,
    "data": [
        {
            "Name": "JT - Opening Balance 1",
            "Email": "PP Opening Balance 1",
            "id": "JTOpeningBalance1"
        },
        {
            "Name": "JT - Opening Balance 2 ",
            "Email": "PP Opening Balance 2",
            "id": "JTOpeningBalance2"
        },
        {
            "Name": "JT - Opening Balance 3 ",
            "Email": "PP Opening Balance 3",
            "id": "JTOpeningBalance3"
        }
    ]
}
  });

function newRecord(record) {
}

function openForm(record) {
}

onMounted(() => {})

</script>