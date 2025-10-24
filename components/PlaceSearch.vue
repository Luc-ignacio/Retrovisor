<template>
  <div class="flex flex-col gap-4">
    <Form
      v-slot="$form"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex w-full gap-4 pt-4 border-t border-t-gray-300"
    >
      <div class="w-full flex flex-col gap-1">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="q"
            name="q"
            placeholder="Search for a location"
            fluid
            :disabled="isSubmitting"
          />
        </IconField>
        <Message
          v-if="$form.q?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.q.error?.message }}</Message
        >
      </div>

      <Button
        type="submit"
        label="Search"
        class="!shrink-0 !self-start"
        :loading="isSubmitting"
        loading-icon="pi pi-spinner-dotted pi-spin"
      />
    </Form>

    <div class="flex flex-col gap-2 pb-10 max-h-[565px] overflow-auto">
      <Card v-for="result in searchResults" key="result.place_id">
        <template #subtitle>
          <div class="space-y-2">
            <p class="text-sm">{{ result.display_name }}</p>

            <div class="w-full text-end">
              <Button
                label="Set location"
                size="small"
                class="!shrink-0 !bg-orange-400 hover:!bg-orange-300 !border-orange-400 hover:!border-orange-300"
                icon-pos="!right"
                @click="setLocation(result)"
              >
                <template #icon>
                  <Icon name="tabler:map-pin-share" size="20" />
                </template>
              </Button>
            </div>
          </div>
        </template>
      </Card>

      <Card v-if="emptySearchResult">
        <template #subtitle>
          <p class="text-sm">{{ emptySearchResult }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

const toast = useToast();
const { searchLocations } = useSearch();
const emit = defineEmits(["SetLocation"]);

const q = ref<string>("");
const isSubmitting = ref<boolean>(false);
const searchResults = ref([]);
const emptySearchResult = ref("");

const resolver = ref(
  zodResolver(
    z.object({
      q: z.string({ message: "Required." }).min(1, { message: "Required." }),
    })
  )
);

const setLocation = (selectedLocation) => {
  emit("SetLocation", selectedLocation);
  searchResults.value = [];
  q.value = "";
};

const onFormSubmit = async ({ valid, values }) => {
  isSubmitting.value = true;
  try {
    if (valid) {
      const res = await searchLocations(values);
      console.log("RES:", res);

      if (res.length > 0) {
        searchResults.value = res;
        emptySearchResult.value = "";
      } else {
        searchResults.value = [];
        emptySearchResult.value = "No locations found.";
      }
    }
  } catch (error) {
    console.log("ERROR", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to search location",
      life: 5000,
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
