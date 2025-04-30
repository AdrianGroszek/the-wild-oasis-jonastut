import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.log(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	// Check what kind of image is this
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	// replaceAll('/','') prevents a folder from being created in the supabase for this image
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);

	// https://tfqnszhpdkrkoycflcpd.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

	// 1. Create cabin
	let query = supabase.from('cabins');

	// A) For create
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	// B) For edit
	if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.log(error);
		throw new Error('Cabin could not be created');
	}

	// 2. Upload image only if no error when creating cabin
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// 3. Delete the cabin if there was an error uploading image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.log(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.log(error);
		throw new Error('Cabin could not be deleted');
	}

	return data;
}
