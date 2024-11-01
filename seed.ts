/* eslint-disable no-console */
import { AppDataSource } from './src/data-source';
import { Category } from './src/entities/Category';

async function seed() {
    await AppDataSource.initialize();
    const categoryRepository = AppDataSource.getRepository(Category);
    
    const categories = [
        { title: 'Ação' },
        { title: 'Comédia' },
        { title: 'Drama' },
    ];

    for (const categoryData of categories) {
        const category = categoryRepository.create(categoryData);
        await categoryRepository.save(category);
    }

    console.log('Seeding concluído com sucesso.');
    await AppDataSource.destroy();
}

seed().catch((error) => {
    console.error('Erro ao rodar seed:', error);
});
