<template>
	<div class="col-lg-12 py-3">
		<ul class="nav nav-tabs" id="myTab" role="tablist">
		  <li class="nav-item"
		  v-for="(list, index) in Object.keys(orginalArray)"
		  v-bind:key="list">
		    <a class="nav-link" data-toggle="tab" :id="orginalArray[list].id+'-tab'" :href="'#tab'+orginalArray[list].id+'_id'" role="tab" :aria-controls="'tab'+orginalArray[list].id" aria-selected="true"
		    :class="(index == '0') ?  'active' : ''">
				{{ orginalArray[list].title }}
			</a>
		  </li>
		</ul>
		<div class="tab-content" id="myTabContent">
		  <div class="tab-pane fade form-group" :class="(index == '0') ?  'active show' : ''" :id="'tab'+orginalArray[list].id+'_id'" role="tabpanel" :aria-controls="'tab'+orginalArray[list].id" v-for="(list, index) in Object.keys(orginalArray)"
		  v-bind:key="list">
			  <div class="row py-3">
				  	<div
				  	v-for="(item, ind) in orginalArray[list]" class="form-group py-3" :class="'col-md-'+screen.defaultColumnSize ">
		  				<label>{{ item.label }}</label>
		  				<input v-if="item.type === 'text' || item.type === 'number'" :type="item.type" name="" class="form-control">
						<select class="form-control" v-if="item.type === 'select'" searchable="Search here..">
							<option>Select...</option>
							<option v-for="(n, i) in item.options" :value="n.value">{{ n.name }}</option>
						</select>
						<textarea class="form-control" rows="3"
							v-if="item.type === 'textarea'">
						</textarea>
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
	</div>
</template>

<script>	
	export default {
		name: "PreviewTemplate",
		props: ['orginalArray', 'screen'],
	};

</script>