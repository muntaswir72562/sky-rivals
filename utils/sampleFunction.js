function calculateDamage(playerAttack, enemyDefense) {
    const baseDamage = playerAttack - enemyDefense;
    return baseDamage > 0 ? baseDamage : 0;
}

export { calculateDamage };