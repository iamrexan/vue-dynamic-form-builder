<template>
	<div class="row">
		<div class="col-md-1"></div>
		<div class="col-md-4 border-right" v-if="formType === 'layout'">
			<div v-if="screen.inputEdit === 0" v-for="(item, i) in sourceArray" :key="i"
			class="drag"
			v-html="item.name"
			draggable="true"
			v-on:drag="whileDrag(item, destinationArray)">
					{{ item.name }}
			</div>
			<div v-if="screen.inputEdit === 1">
				<div class="form-group" >
					<label>Input ID</label>
					<input type="text" class="form-control" disabled="true" v-model="screen.editObject.id">
				</div>
				<div class="form-group" >
					<label>Label Text</label>
					<input type="text" class="form-control" v-model="screen.editObject.label">
				</div>
				<div class="form-group" v-if="!optionsArray.includes(screen.editObject.type)">
					<label>Place Holder</label>
					<input type="text" class="form-control" v-model="screen.editObject.placeholder">
				</div>
				<div class="form-group" v-if="optionsArray.includes(screen.editObject.type)">
					<div class="row">
						<label class="col-sm-6">Select Options</label>
						<div class="col-sm-6">
							<span class="float-right"
							v-on:click="addOption(screen.editObject.id)" style="cursor: pointer;">
								Add <i class="fa fa-plus"></i>
							</span>
						</div>
					</div>
					<div v-for="(value, index) in screen.editObject.options" class="row">
						<input type="text" v-model="screen.editObject.options[index].value"  class="form-control col-sm-6">
						<input type="text" v-model="screen.editObject.options[index].name"  class="form-control col-sm-6">
					</div>
				</div>
				<div class="form-group p-4">
					<label>Required</label>
					<input type="checkbox" v-model="screen.editObject.isRequired">
				</div>
				<button class="btn btn-primary" v-on:click="screen.inputEdit = 0">Close</button>
				<button class="btn btn-secondary" v-on:click="removeInput(screen.editObject.id)">Delete</button>
			</div>
		</div>

		<!-- Second Column -->
		<div class="p-3" :class="(formType === 'preview') ? 'col-md-10' : 'col-md-6'">
			<div class="row border-bottom bg-light">
				<div class="col-md-6">
					<div class="row form-group">
						<label class="col-sm-3 h5 text-center my-auto">Title <span class="text-danger">*</span></label>
						<input type="text" name="" placeholder="Form title" class="col-sm-8 form-control" :disabled="(formType === 'preview') ? true : false">
					</div>
				</div>
				<div class="col-md-6 inline">
					<div class="row">
						<div class="col-sm-8 form-group">
							<select v-if="formType === 'preview'" class="form-control"
								v-on:change="updateColumnSize()">
								<option value="">Select</option>
								<option v-for="(item, index) in columnSizeArray" :value="index">{{ item }}</option>
							</select>
						</div>
						<div class="col-sm-4">
							<button v-if="formType === 'layout'" class="btn btn-primary right" v-on:click="changeFormScreen('preview')">Preview</button>
							<button v-if="formType === 'preview'" class="btn btn-primary right" v-on:click="changeFormScreen('preview')">Dashboard</button>
						</div>
					</div>
				</div>
			</div>
			<div class="row p-3 border-bottom" v-if="formType === 'layout'">
				<div class="col-sm-6"></div>
				<div class="col-sm-6">
					<button class="btn btn-secondary float-right"
					v-on:click="sourceToDestination(null, null, null, 'one')">
						Add Section
					</button>
				</div>
			</div>
			<div v-if="formType === 'layout'" class="row form-group border border-light p-3" style="max-height: 300px;overflow-y: scroll">
				<div class="py-3" style="width: 100%;" v-for="(list, index) in Object.keys(destinationArray)">
					<div class="row pb-3">
						<div class="col-sm-6">
							<input type="text" name="" class="form-control" placeholder="Section Title" v-model="destinationArray[list].title">
						</div>
						<div class="col-sm-6">
							<button class="btn btn-secondary" 
							v-on:click="removeSection(destinationArray, list)">Remove Section</button>
							<button class="btn btn-secondary" 
							v-on:click="toggle(destinationArray[list])">Collapse</button>
						</div>
					</div>
					<div class="drop row"
					v-on:drop="sourceToDestination(destinationArray, list, list)" v-on:dragover="allowDrop"
					v-bind:key="list"
					v-if="destinationArray[list].isToggle == true">
						<div class="col-md-4 form-group" 
						v-for="(item, i) in destinationArray[list]" 
						:key="i">
							<label class="noselect" v-model="item.label" :class="'id_'+item.id" title="Double click to edit" @dblclick="editInput(item)">
								{{ item.label }}
								<span class="text-danger" v-if="item.isRequired === true">*</span>
							</label>
							<input :type="item.type" :placeholder="item.placeholder" v-if="item.type === 'text' || item.type === 'number'" class="form-control">
							<select class="form-control" v-if="item.type === 'select'" searchable="Search here..">
								<option>Select...</option>
								<option v-for="(n, i) in item.options" :value="n.value">{{ n.name }}</option>
							</select>
							<textarea class="form-control" rows="1"
							v-if="item.type === 'textarea'"></textarea>
						    <div class="form-check" v-if="item.type === 'radio'"
						    v-for="(n, i) in item.options" :value="n.value">
						      <label class="form-check-label" for="radio1">
						        <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1" 
						        :checked="(i === 0) ? true : false">{{ n.name }}
						      </label>
						    </div>
						</div>
						
					</div>
				</div>
			</div>
			<div v-else-if="formType = 'preview'" class="row">
				<preview-template :orginalArray="destinationArray" :screen="screen" />
			</div>
		</div>
	</div>
</template>

<script>
	import PreviewTemplate from './PreviewTemplate.vue';

	export default {
		components: { PreviewTemplate },
		name: "vue-dynamic-form-builder",
		data() {
			return {
				sourceArray: [{
					"name": "input",
					"html": "<input type='text' class='form-control'>",
					"icon": null,
					"label": "Text Box",
					"type": "text",
					"placeholder": null,
					"isRequired" : true
				},
				{
					"name": "select",
					"html": "<select class='form-control'></select>",
					"icon": null,
					"label": "Select Box",
					"options": [{
						"name": "one",
						"value": "one"
					},
					{
						"name": "two",
						"value": "two"
					}],
					"type": "select",
					"isRequired" : false
				},
				{
					"name": "Number",
					"html": "<input type='number' class='form-control'>",
					"icon": null,
					"label": "Number Box",
					"type": "number",
					"placeholder": null,
					"isRequired" : false
				},
				{
					"name": "TextArea",
					"html": "<textarea class='form-control'></textarea>",
					"icon": null,
					"label": "Text Area",
					"type": "textarea",
					"placeholder": null,
					"isRequired" : false
				},
				{
					"name": "RadioButton",
					"html": '<label class="form-check-label" for="radio1"> <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1" checked>Option 1 </label>',
					"icon": null,
					"label": "Radio",
					"type": "radio",
					"options": [{
						"name": "Option 1",
						"value": "option1"
					},
					{
						"name": "Option 2",
						"value": "option2"
					}],
					"placeholder": null,
					"isRequired" : false
				}],
				destinationArray: {
				},
				itemData: {},
				formType: "layout",
				optionsArray: [
					"select", 'radio'
				],
				screen: {
					"inputEdit": 0,
					"editObject": {},
					"oneOptionBox": 0,
					"oneSectionBox": 0,
					"defaultColumnSize": 4,
				},
				columnSizeArray: {
					"2": "col-md-2",
					"3": "col-md-3",
					"4": "col-md-4",
					"6": "col-md-6",
					"8": "col-md-8",
					"12": "col-md-12"
				}
			};
		},
		methods: {
			handleDrop(toList, data) {
				const fromList = data.list;
				if (fromList) {
					toList.push(data.item);
					fromList.splice(fromList.indexOf(data.item), 1);
					toList.sort((a, b) => a > b);
				}
			},
			sourceToDestination(destinationArray=null, index=null, list=null, type=null) {
				if (type !== "one") {
					let data = JSON.parse(JSON.stringify(this.itemData));
					destinationArray[index].push(data);
					data.id = Math.floor(Math.random() * 100000);
				} else {
					this.addSection();
				}
			},
			whileDrag(item, destinationArray) {
				this.itemData = item;
			},
			changeFormScreen(val=null) {
				if (val === null) {
					this.formType = event.srcElement.value;
				} else if(this.formType !== 'preview') {
					this.formType = val;
				} else {
					this.formType = 'layout';
				}
			},
			editInput(item) {
				this.screen.inputEdit = 1;
				this.screen.editObject =item;
			},
			addOption(id) {
				let def = 0, destinationArray = this.destinationArray;
				this.limitOptionBoxAddition(this);
				var oneOptionBox = this.screen.oneOptionBox;
				Object.keys(this.destinationArray).forEach(function(ind) {
					destinationArray[ind].forEach(function(value, index) {
						if (value.id === id && oneOptionBox === 0) {
							let len = value.options.length
							value.options.push(JSON.parse(JSON.stringify(value.options[0])));
							value.options[len].name = "";
							value.options[len].value = "";
						}
					});
				});
			},
			limitOptionBoxAddition(data) {
				Object.keys(data.destinationArray).forEach(function(ind) {
					data.destinationArray[ind].forEach(function(item, index) {
						if (item.type === "select") {
							item.options.forEach(function(itm, i) {
								if (itm.value === "" && itm.name === "") {
									data.screen.oneOptionBox = 1;
								} else {
									data.screen.oneOptionBox = 0;
								}
							});
						}
					});
				});
			},
			addSection() {
				let len = Object.keys(this.destinationArray).length;
				this.limitSectionAddition(this);
				if (this.screen.oneSectionBox === 0) {
					this.$set(this.destinationArray, len, []);
					this.destinationArray[len].id = Math.floor(Math.random() * 1000000)
					this.$set(this.destinationArray[len], "name", "");
					this.$set(this.destinationArray[len], "isToggle", true);
				} else {
					alert("Previous section is still empty");
				}
			},
			limitSectionAddition(data) {
				let destinationArray = data.destinationArray, len, def=0;
				Object.keys(destinationArray).forEach(function(list, index) {
					len = destinationArray[list].length;
					if (len < 1) {
						def = 1
						data.screen.oneSectionBox = 1;
					}
				});
				if (def === 0) {
					data.screen.oneSectionBox = 0;
				}
			},
			dropEvent() {
				event.preventDefault()
			},
			allowDrop() {
				event.preventDefault()
			},
			toggle(data) {
				this.$set(data, "isToggle", !data.isToggle);
			},
			removeSection(data, index) {
				var arr = data;
				if (data[index].length < 1) {
					this.$delete(data, index, true);
				} else {
					alert('Can\'t remove non-empty section')
				}
			},
			removeInput(id) {
				let destinationArray = this.destinationArray;
				var oneOptionBox = this.screen.oneOptionBox, data = this;

				Object.keys(this.destinationArray).forEach(function(ind) {
					destinationArray[ind].forEach(function(value, index) {
						if (value.id === id) {
							data.screen.inputEdit = 0;
							data.$delete(destinationArray[ind], index, true);
						}
					});
				});
			},
			updateColumnSize() {
				this.screen.defaultColumnSize = event.srcElement.value;
			}
		},
	};
</script>